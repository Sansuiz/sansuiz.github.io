// 热力图初始化
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/plugins/Legend';
import 'cal-heatmap/plugins/Tooltip';

export function initHeatmap() {
  const notesData = window.notesDates || [];
  
  const cal = new CalHeatmap();
  cal.paint({
    itemSelector: '#heatmap-container',
    domain: {
      type: 'year',
      gutter: 10,
    },
    subDomain: {
      type: 'day',
      radius: 2,
    },
    date: { start: new Date('2020-01-01') },
    data: {
      source: notesData,
      x: 'date',
      y: d => 1,
    },
    scale: {
      color: {
        type: 'linear',
        range: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        domain: [0, 3]
      }
    }
  });
}