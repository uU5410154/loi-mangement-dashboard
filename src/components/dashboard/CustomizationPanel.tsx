import { useState } from 'react';
import { Edit3, Save, X, Plus, LayoutGrid } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '../ui/utils';

export function CustomizationPanel() {
  const {
    isEditMode,
    setEditMode,
    currentDashboard,
    saveDashboard,
    isSaving
  } = useDashboardStore();

  const [showWidgetGallery, setShowWidgetGallery] = useState(false);

  const handleEditToggle = () => {
    if (isEditMode) {
      // Exiting edit mode - save changes
      saveDashboard();
    }
    setEditMode(!isEditMode);
  };

  const handleCancel = () => {
    // TODO: Revert changes
    setEditMode(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isEditMode && (
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          onClick={handleEditToggle}
          title="Customize Dashboard"
        >
          <Edit3 className="h-5 w-5" />
        </Button>
      )}

      {/* Edit Mode Panel */}
      {isEditMode && (
        <div className="fixed bottom-6 right-6 z-50 space-y-2">
          {/* Main Controls Card */}
          <Card className="shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Customize Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Add Widget Button */}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowWidgetGallery(!showWidgetGallery)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </Button>

              <Separator />

              {/* Save/Cancel Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={handleEditToggle}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>

              {/* Dashboard Info */}
              <Separator />
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Widgets:</span>
                  <span className="font-medium">{currentDashboard?.widgets.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Layout:</span>
                  <span className="font-medium">{currentDashboard?.name || 'Default'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Mode Indicator */}
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium text-center shadow-xl">
            <LayoutGrid className="h-4 w-4 inline mr-2" />
            Edit Mode Active
          </div>
        </div>
      )}

      {/* Widget Gallery Modal (TODO: Implement full gallery) */}
      {showWidgetGallery && isEditMode && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setShowWidgetGallery(false)}>
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <Card>
              <CardHeader>
                <CardTitle>Add Widget</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Widget gallery coming soon...
                </p>
                <Button className="mt-4" onClick={() => setShowWidgetGallery(false)}>
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
