import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface PivotTableColumn {
  column: string;
  children?: string[];
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  data: any = [
    {
      name: '1',
      //   visible: true,
      children: [
        { name: '[1] 1', age: 10 },
        {
          name: '[1] 2',
          age: '[1] 2',
          //   visible: true,
          children: [
            {
              name: '[1] [2] 3',
              age: '[1] [2] 3',
              //   visible: true,
            },
            {
              name: '[1] [2] 3',
              age: '[1] [2] 3',
              //   visible: true,
              children: [
                {
                  name: '[1] [2] [3] 4',
                  age: '[1] [2] [3] 4',
                },
                {
                  name: '[1] [2] [3] 4',
                  age: '[1] [2] [3] 4',
                  //   visible: true,
                  children: [
                    { name: '[1] [2] [3] [4] 5', age: '[1] [2] [3] [4] 5' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: '2',
      //   visible: true,
      children: [
        {
          name: '[2] 2',
          age: '[2] 2',
        },
      ],
    },
  ];

  data_: any = {
    children: [
      {
        children: [
          {
            children: [
              {
                name: 'VAV_104',
                values: [
                  'VAV',
                  70.01555209953344,
                  72.11167280800915,
                  72.50777604976672,
                ],
              },
              {
                name: 'VAV_106',
                values: ['VAV', 71.0, 72.81919688569286, 72.50777604976672],
              },
            ],
            name: 'Floor 9',
            subtotals: {
              'zone_setpoint::AVG(zone_setpoint)': 70.50777604976672,
              'zone_setpoint::MIN(zone_setpoint)': 72.50777604976672,
              'zone_sensor::AVG(zone_sensor)': 72.4647953961239,
            },
          },
        ],
        name: 'Transactions',
        subtotals: {
          'zone_setpoint::AVG(zone_setpoint)': 70.50777604976672,
          'zone_setpoint::MIN(zone_setpoint)': 73.50777604976672,
          'zone_sensor::AVG(zone_sensor)': 72.4647953961239,
        },
      },
    ],
    name: 'root',
    totals: {
      'zone_setpoint::AVG(zone_setpoint)': 70.50777604976672,
      'zone_setpoint::MIN(zone_setpoint)': 71.50777604976672,
      'zone_sensor::AVG(zone_sensor)': 72.4647953961239,
    },
    columns: [
      'building_name',
      // 'building_name',
      // 'area_name',
      // 'device_name',
      'FIRST(device_template_name)',
      'zone_setpoint::AVG(zone_setpoint)',
      'zone_setpoint::MIN(zone_setpoint)',
      'zone_setpoint::MAX(zone_setpoint)',
      'zone_sensor::AVG(zone_sensor)',
    ],
  };

  columns: PivotTableColumn[] = [];
  secondaryColumns: any[] = [];

  ngOnInit() {
    this.generateColumns();
    this.generateSecondaryColumns();
  }

  generateColumns() {
    this.columns = [];
    this.data_.columns.forEach((column) => {
      const separator = '::';
      if (column.includes(separator)) {
        const [parent, child] = column.split(separator);

        const currentColumn = this.columns.find((c) => c.column === parent);
        if (currentColumn) {
          currentColumn.children.push(child);
        } else {
          this.columns.push({ column: parent, children: [child] });
        }
      } else {
        this.columns.push({ column });
      }
    });
  }

  generateSecondaryColumns() {
    this.secondaryColumns = [];
    this.columns.forEach((column) => {
      if (column.children) {
        column.children.forEach((childColumn) => {
          this.secondaryColumns.push(childColumn);
        });
      } else {
        this.secondaryColumns.push(null);
      }
    });
  }

  onClick(item) {
    item.visible = !item.visible ?? true;
    console.log(item);
  }

  parseStyle(item, level: number) {
    return {
      paddingLeft: level > 0 ? `${10 * (level + 1)}px` : '',
    };
  }
}
