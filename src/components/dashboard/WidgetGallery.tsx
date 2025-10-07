import { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useDashboardStore } from '../../store/dashboardStore';
import { WIDGET_REGISTRY, WIDGET_CATEGORIES } from '../../config/widgetRegistry';
import { WidgetDefinition } from '../../types/widget';
import { WidgetInstance } from '../../types/dashboard';
import { cn } from '../ui/utils';

interface WidgetGalleryProps {
  onClose: () => void;
}

export function WidgetGallery({ onClose }: WidgetGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addWidget, currentDashboard } = useDashboardStore();

  // Filter widgets based on search and category
  const filteredWidgets = Object.values(WIDGET_REGISTRY).filter(widget => {
    const matchesSearch =
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.nameThai.includes(searchQuery) ||
      widget.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || widget.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddWidget = (widgetDef: WidgetDefinition) => {
    // Find a suitable position for the new widget
    const existingWidgets = currentDashboard?.widgets || [];
    const maxY = existingWidgets.reduce((max, w) =>
      Math.max(max, w.position.y + w.position.h), 0
    );

    // Create new widget instance
    const newWidget: WidgetInstance = {
      id: `widget-${Date.now()}`,
      type: widgetDef.type,
      config: widgetDef.defaultConfig,
      position: {
        x: 0,
        y: maxY,
        w: widgetDef.defaultSize.w,
        h: widgetDef.defaultSize.h
      },
      minW: widgetDef.minSize.w,
      minH: widgetDef.minSize.h,
      maxW: widgetDef.maxSize?.w,
      maxH: widgetDef.maxSize?.h
    };

    addWidget(newWidget);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Add Widget</CardTitle>
              <CardDescription>เพิ่มวิดเจ็ตลงในแดชบอร์ด</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search widgets... (ค้นหาวิดเจ็ต...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col min-h-0">
          <div className="border-b px-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">All</TabsTrigger>
              {WIDGET_CATEGORIES.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <CardContent className="pt-6">
              <TabsContent value={selectedCategory} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWidgets.map(widget => (
                    <WidgetCard
                      key={widget.type}
                      widget={widget}
                      onAdd={() => handleAddWidget(widget)}
                    />
                  ))}
                </div>

                {filteredWidgets.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No widgets found</p>
                    <p className="text-sm mt-1">ไม่พบวิดเจ็ต</p>
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </ScrollArea>
        </Tabs>
      </Card>
    </div>
  );
}

interface WidgetCardProps {
  widget: WidgetDefinition;
  onAdd: () => void;
}

function WidgetCard({ widget, onAdd }: WidgetCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all",
        isHovered && "ring-2 ring-primary shadow-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onAdd}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="rounded-md p-2 bg-primary/10 text-primary">
            {widget.icon}
          </div>
          <Badge variant="outline" className="text-xs">
            {widget.category}
          </Badge>
        </div>
        <CardTitle className="text-sm mt-3">
          <div>{widget.nameThai}</div>
          <div className="text-xs font-normal text-muted-foreground mt-1">
            {widget.name}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-3">
          {widget.descriptionThai}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Size: {widget.defaultSize.w}×{widget.defaultSize.h}
          </div>
          <Button
            size="sm"
            className="h-7"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
