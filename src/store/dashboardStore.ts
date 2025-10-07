import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Layout } from 'react-grid-layout';
import {
  DashboardState,
  DashboardLayout,
  WidgetInstance,
  UserPreferences,
  MetricType,
  MetricData
} from '../types/dashboard';

interface DashboardStore extends DashboardState {}

const DEFAULT_LAYOUT: DashboardLayout = {
  id: 'default',
  name: 'Default Dashboard',
  layouts: [],
  widgets: [],
  isDefault: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

const DEFAULT_PREFERENCES: UserPreferences = {
  userId: 'user-1', // This will be replaced with actual user ID from auth
  theme: 'light',
  defaultTimeRange: '7d',
  notifications: {
    enabled: true
  }
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      // State
      currentDashboard: DEFAULT_LAYOUT,
      dashboards: [DEFAULT_LAYOUT],
      isEditMode: false,
      preferences: DEFAULT_PREFERENCES,
      metricsData: new Map(),
      isLoading: false,
      isSaving: false,

      // Actions
      setEditMode: (isEdit: boolean) => {
        set({ isEditMode: isEdit });
      },

      addWidget: (widget: WidgetInstance) => {
        const currentDashboard = get().currentDashboard;
        if (!currentDashboard) return;

        const updatedDashboard = {
          ...currentDashboard,
          widgets: [...currentDashboard.widgets, widget],
          updatedAt: new Date()
        };

        set({
          currentDashboard: updatedDashboard,
          dashboards: get().dashboards.map(d =>
            d.id === currentDashboard.id ? updatedDashboard : d
          )
        });
      },

      removeWidget: (id: string) => {
        const currentDashboard = get().currentDashboard;
        if (!currentDashboard) return;

        const updatedDashboard = {
          ...currentDashboard,
          widgets: currentDashboard.widgets.filter(w => w.id !== id),
          updatedAt: new Date()
        };

        set({
          currentDashboard: updatedDashboard,
          dashboards: get().dashboards.map(d =>
            d.id === currentDashboard.id ? updatedDashboard : d
          )
        });
      },

      updateWidget: (id: string, updates: Partial<WidgetInstance>) => {
        const currentDashboard = get().currentDashboard;
        if (!currentDashboard) return;

        const updatedDashboard = {
          ...currentDashboard,
          widgets: currentDashboard.widgets.map(w =>
            w.id === id ? { ...w, ...updates } : w
          ),
          updatedAt: new Date()
        };

        set({
          currentDashboard: updatedDashboard,
          dashboards: get().dashboards.map(d =>
            d.id === currentDashboard.id ? updatedDashboard : d
          )
        });
      },

      updateLayout: (layouts: Layout[]) => {
        const currentDashboard = get().currentDashboard;
        if (!currentDashboard) return;

        const updatedDashboard = {
          ...currentDashboard,
          layouts,
          updatedAt: new Date()
        };

        set({
          currentDashboard: updatedDashboard,
          dashboards: get().dashboards.map(d =>
            d.id === currentDashboard.id ? updatedDashboard : d
          )
        });
      },

      loadDashboard: async (dashboardId: string) => {
        set({ isLoading: true });
        try {
          // Find dashboard in local state
          const dashboard = get().dashboards.find(d => d.id === dashboardId);

          if (dashboard) {
            set({ currentDashboard: dashboard });
          } else {
            // TODO: Fetch from API if not found locally
            console.warn(`Dashboard ${dashboardId} not found`);
          }
        } catch (error) {
          console.error('Error loading dashboard:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      saveDashboard: async () => {
        const currentDashboard = get().currentDashboard;
        if (!currentDashboard) return;

        set({ isSaving: true });
        try {
          // TODO: Save to API/MongoDB
          console.log('Saving dashboard:', currentDashboard);

          // For now, just update local state
          set({
            dashboards: get().dashboards.map(d =>
              d.id === currentDashboard.id ? currentDashboard : d
            )
          });
        } catch (error) {
          console.error('Error saving dashboard:', error);
        } finally {
          set({ isSaving: false });
        }
      },

      createDashboard: async (name: string) => {
        const newDashboard: DashboardLayout = {
          id: `dashboard-${Date.now()}`,
          name,
          userId: get().preferences?.userId,
          layouts: [],
          widgets: [],
          isDefault: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set({
          dashboards: [...get().dashboards, newDashboard],
          currentDashboard: newDashboard
        });

        // TODO: Save to API/MongoDB
      },

      deleteDashboard: async (dashboardId: string) => {
        const dashboards = get().dashboards.filter(d => d.id !== dashboardId);
        const currentDashboard = get().currentDashboard;

        set({
          dashboards,
          currentDashboard: currentDashboard?.id === dashboardId
            ? dashboards[0] || DEFAULT_LAYOUT
            : currentDashboard
        });

        // TODO: Delete from API/MongoDB
      },

      setPreferences: (prefs: Partial<UserPreferences>) => {
        set({
          preferences: {
            ...get().preferences,
            ...prefs
          } as UserPreferences
        });

        // TODO: Save to API/MongoDB
      },

      updateMetricData: (metricType: MetricType, data: MetricData) => {
        const metricsData = new Map(get().metricsData);
        metricsData.set(metricType, data);
        set({ metricsData });
      }
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        currentDashboard: state.currentDashboard,
        dashboards: state.dashboards,
        preferences: state.preferences
      })
    }
  )
);
