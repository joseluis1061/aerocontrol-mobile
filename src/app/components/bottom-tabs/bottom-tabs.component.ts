import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-tabs',
  templateUrl: './bottom-tabs.component.html',
  styleUrls: ['./bottom-tabs.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class BottomTabsComponent {
  @Input() activeTab: string = '';

  tabs = [
    {
      name: 'dashboard',
      route: '/dashboard',
      icon: 'home',
      label: 'Inicio',
    },
    {
      name: 'flights',
      route: '/flights',
      icon: 'airplane',
      label: 'Vuelos',
    },
    {
      name: 'airports',
      route: '/airports',
      icon: 'business',
      label: 'Aeropuertos',
    },
    {
      name: 'programs',
      route: '/programs',
      icon: 'calendar',
      label: 'Programas',
    },
    {
      name: 'more',
      route: '/more',
      icon: 'ellipsis-horizontal',
      label: 'Más',
    },
  ];

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {}

  async onTabClick(tab: any) {
    if (tab.name === 'more') {
      await this.showMoreMenu();
    } else {
      this.router.navigate([tab.route]);
    }
  }

  async showMoreMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Más opciones',
      buttons: [
        {
          text: 'Gestión de Usuarios',
          icon: 'people',
          handler: () => {
            this.router.navigate(['/users']);
          },
        },
        {
          text: 'Reportes y Logs',
          icon: 'bar-chart',
          handler: () => {
            this.router.navigate(['/reports']);
          },
        },
        {
          text: 'Configuración',
          icon: 'settings',
          handler: () => {
            // Función para cuando implementes configuración
            console.log('Configuración - próximamente');
          },
        },
        {
          text: 'Cerrar Sesión',
          icon: 'log-out',
          role: 'destructive',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  isTabActive(tabName: string): boolean {
    if (tabName === 'more') {
      return this.activeTab === 'users' || this.activeTab === 'reports';
    }
    return this.activeTab === tabName;
  }
}
