# Dashboard Customization Demo Guide

## 🚀 How to Run

```bash
npm run dev
```

Then open http://localhost:3000

The demo dashboard will load automatically (toggle is in `src/main.tsx`)

---

## ✨ Features You Can Test Right Now

### 1. **View Dashboard**
- 4 pre-configured metric widgets displayed
- Clean, responsive layout
- Dark mode toggle (top right)

### 2. **Enter Edit Mode**
- Click the **blue floating button** (bottom right)
- Edit mode panel appears
- Grid guidelines become visible
- Widgets show edit controls on hover

### 3. **Drag & Drop Widgets**
- Hover over any widget in edit mode
- Drag handle appears at top center
- Click and drag to reposition
- Widgets snap to grid
- Visual placeholder shows drop position

### 4. **Resize Widgets**
- Grab bottom-right corner of any widget
- Drag to resize
- Respects minimum/maximum size constraints
- Real-time visual feedback

### 5. **Add New Widgets**
- Click **"Add Widget"** button in edit panel
- Widget Gallery modal opens
- Features:
  - **Search bar** - Search by name (English/Thai)
  - **Category tabs** - Filter by type
  - **8 widget types** available:
    - Metric Card
    - Chart
    - Data Table
    - Status Indicator
    - Contract Summary
    - Trend Analysis
    - Data Quality
    - System Health
  - Click any widget card to add it
  - Auto-positions below existing widgets

### 6. **Remove Widgets**
- Hover over widget in edit mode
- Click **X button** (top right)
- Confirmation dialog appears
- Widget removed from dashboard

### 7. **Save Changes**
- Click **"Save"** button in edit panel
- Layout persists to localStorage
- Survives page refresh
- Exit edit mode

### 8. **Cancel Changes**
- Click **"Cancel"** button
- Exits edit mode without saving
- (Note: Revert functionality coming soon)

---

## 📊 Current Dashboard Layout

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   Total     │  Checked    │    OCR      │  Accuracy   │
│ Contracts   │ Contracts   │ Confidence  │    Rate     │
│   2,384     │   1,847     │   94.7%     │   91.2%     │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

Each widget shows:
- **Metric value** (large number)
- **Trend indicator** (up/down arrow)
- **Percentage change** vs last week
- **Icon** (color-coded by metric type)

---

## 🎨 Visual Elements

### Edit Mode Indicators:
- ✅ Grid lines visible
- ✅ Widgets have blue ring border
- ✅ Drag handles appear on hover
- ✅ Settings & remove buttons visible
- ✅ "Edit Mode Active" badge

### Widget Gallery:
- ✅ Full-screen modal
- ✅ Search functionality
- ✅ Category filtering (5 categories)
- ✅ Responsive grid (3 columns on desktop)
- ✅ Hover effects with ring highlight
- ✅ Size information (e.g., "3×2")

---

## 🧪 Testing Scenarios

### Scenario 1: Basic Customization
1. Enter edit mode
2. Drag "Total Contracts" to right side
3. Drag "Accuracy Rate" to left side
4. Save changes
5. Refresh page - layout persists ✅

### Scenario 2: Add Multiple Widgets
1. Enter edit mode
2. Click "Add Widget"
3. Add "Chart" widget
4. Add "Data Table" widget
5. Add "Status Indicator"
6. Observe auto-positioning
7. Rearrange as desired

### Scenario 3: Remove & Restore
1. Remove all widgets except one
2. Dashboard shows single widget
3. Add widgets back from gallery
4. Recreate custom layout

### Scenario 4: Category Browse
1. Open widget gallery
2. Try each category tab:
   - Overview (2 widgets)
   - Analytics (3 widgets)
   - System (2 widgets)
   - Data (1 widget)
3. Search for "metric"
4. Search for "chart"

---

## 📝 Widget Types Available

| Widget | Thai Name | Category | Default Size | Status |
|--------|-----------|----------|--------------|--------|
| Metric Card | การ์ดตัวชี้วัด | Overview | 3×2 | ✅ Working |
| Chart | กราฟ | Analytics | 6×4 | 🚧 Placeholder |
| Data Table | ตารางข้อมูล | Data | 12×6 | 🚧 Placeholder |
| Status | ตัวบ่งชี้สถานะ | System | 3×2 | 🚧 Placeholder |
| Contract Summary | สรุปสถานะสัญญา | Overview | 12×6 | 🚧 Placeholder |
| Trend Chart | การวิเคราะห์แนวโน้ม | Analytics | 6×4 | 🚧 Placeholder |
| Data Quality | คุณภาพข้อมูล | Analytics | 6×4 | 🚧 Placeholder |
| System Health | สุขภาพระบบ | System | 6×3 | 🚧 Placeholder |

---

## 🎯 What Works vs What's Coming

### ✅ Currently Working:
- Drag & drop positioning
- Widget resizing with constraints
- Add widgets from gallery
- Remove widgets
- Search & filter widgets
- Layout persistence (localStorage)
- Edit mode toggle
- Visual feedback & animations
- Error boundaries
- Responsive grid (12 columns)

### 🚧 Coming Next:
- **Widget Configuration Dialog**
  - Select metric for each widget
  - Choose time range
  - Apply filters
  - Customize colors

- **More Widget Types**
  - Chart widget with multiple chart types
  - Data table with sorting/filtering
  - Contract summary widget

- **Backend Integration**
  - MongoDB connection
  - Real-time data updates
  - User authentication
  - Save multiple dashboard layouts

---

## 💡 Tips & Tricks

1. **Keyboard Shortcuts** (coming soon)
   - `E` - Toggle edit mode
   - `Cmd/Ctrl + S` - Save
   - `Esc` - Cancel/close

2. **Grid System**
   - 12 columns wide
   - 80px row height
   - 16px margins between widgets

3. **Size Constraints**
   - Metric cards: min 2×2, max 4×3
   - Charts: min 4×3, max 12×6
   - Tables: min 6×4, max 12×8

4. **Auto-Layout**
   - New widgets positioned at bottom
   - Vertical compaction enabled
   - No collision detection (widgets can overlap)

5. **Data Persistence**
   - Stored in browser localStorage
   - Key: `dashboard-storage`
   - Clear storage to reset: `localStorage.clear()`

---

## 🐛 Known Issues

1. **Placeholders**: Most widget types show placeholder content
2. **Configuration**: Widget settings button doesn't open dialog yet
3. **Cancel**: Cancel button exits edit mode but doesn't revert changes
4. **Responsive**: Grid width is fixed at 1200px (mobile optimization pending)
5. **Theme**: Dark mode works for UI but not all widgets

---

## 📈 Progress: 50% Complete

**Completed:**
- ✅ Infrastructure & types
- ✅ State management
- ✅ Widget system
- ✅ Drag & drop grid
- ✅ Widget gallery
- ✅ Metric card widget

**In Progress:**
- 🚧 Widget configuration
- 🚧 Additional widget types

**Next Up:**
- ⏳ Backend API
- ⏳ MongoDB integration
- ⏳ Real-time updates
- ⏳ User authentication

---

## 🔄 Switch Back to Original Dashboard

In `src/main.tsx`, change:

```typescript
const USE_DEMO = false;  // Show original dashboard
```

Then refresh the browser.

---

## 📚 Code Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardGrid.tsx          # Grid layout engine
│   │   ├── CustomizationPanel.tsx    # Edit controls
│   │   └── WidgetGallery.tsx         # Widget browser
│   ├── widgets/
│   │   ├── BaseWidget.tsx            # Widget wrapper
│   │   └── MetricCardWidget.tsx      # Metric display
│   └── ui/                            # shadcn components
├── store/
│   └── dashboardStore.ts             # Zustand state
├── config/
│   ├── widgetRegistry.tsx            # Widget definitions
│   └── metricsConfig.ts              # Metric definitions
├── types/
│   ├── dashboard.ts                  # Dashboard types
│   ├── widget.ts                     # Widget types
│   └── metric.ts                     # Metric types
├── App.tsx                            # Original app
└── App.demo.tsx                       # Demo app
```

---

## 🎉 Congratulations!

You now have a fully functional drag-and-drop dashboard customization system!

The foundation is solid and ready for:
- Additional widget types
- Backend integration
- Real-time data
- Multi-user support

Happy customizing! 🚀
