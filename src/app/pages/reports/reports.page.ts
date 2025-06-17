import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BottomTabsComponent } from 'src/app/components/bottom-tabs/bottom-tabs.component';

import {
  IonicModule,
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: 'chart' | 'table' | 'export';
  lastUpdated: string;
  data?: any;
}

interface SystemLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  level: 'info' | 'warning' | 'error' | 'success';
  module: string;
  ip?: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    BottomTabsComponent,
  ],
})
export class ReportsPage implements OnInit {
  reportCards: ReportCard[] = [
    {
      id: '1',
      title: 'Vuelos del Mes',
      description: 'Estadísticas de vuelos y operaciones mensuales',
      icon: 'airplane',
      color: 'primary',
      type: 'chart',
      lastUpdated: '2024-02-04 10:30',
      data: {
        totalFlights: 1247,
        onTime: 1089,
        delayed: 132,
        cancelled: 26,
      },
    },
    {
      id: '2',
      title: 'Actividad de Usuarios',
      description: 'Registro de actividad y accesos del sistema',
      icon: 'people',
      color: 'secondary',
      type: 'chart',
      lastUpdated: '2024-02-04 09:45',
      data: {
        totalUsers: 42,
        activeToday: 28,
        newThisMonth: 6,
      },
    },
    {
      id: '3',
      title: 'Rendimiento de Aeropuertos',
      description: 'Métricas operacionales por aeropuerto',
      icon: 'business',
      color: 'tertiary',
      type: 'table',
      lastUpdated: '2024-02-04 11:15',
      data: {
        totalAirports: 8,
        operational: 7,
        maintenance: 1,
      },
    },
    {
      id: '4',
      title: 'Incidencias y Alertas',
      description: 'Registro de eventos e incidencias del sistema',
      icon: 'warning',
      color: 'warning',
      type: 'table',
      lastUpdated: '2024-02-04 08:20',
      data: {
        totalIncidents: 15,
        resolved: 12,
        pending: 3,
      },
    },
    {
      id: '5',
      title: 'Exportar Datos',
      description: 'Generar reportes personalizados en PDF/Excel',
      icon: 'download',
      color: 'success',
      type: 'export',
      lastUpdated: '2024-02-04 12:00',
    },
    {
      id: '6',
      title: 'Análisis Financiero',
      description: 'Costos operacionales y análisis financiero',
      icon: 'card',
      color: 'dark',
      type: 'chart',
      lastUpdated: '2024-02-04 07:30',
      data: {
        monthlyRevenue: 2450000,
        operationalCosts: 1890000,
        profit: 560000,
      },
    },
  ];

  systemLogs: SystemLog[] = [
    {
      id: '1',
      timestamp: '2024-02-04 10:30:15',
      user: 'juan.perez@aerocontrol.com',
      action: 'Actualización de Vuelo',
      details: 'Modificó el horario del vuelo AV2547 de 10:30 a 10:45',
      level: 'info',
      module: 'Gestión de Vuelos',
      ip: '192.168.1.100',
    },
    {
      id: '2',
      timestamp: '2024-02-04 10:25:42',
      user: 'maria.gonzalez@aerocontrol.com',
      action: 'Creación de Usuario',
      details: 'Creó nuevo usuario: laura.jimenez@aerocontrol.com',
      level: 'success',
      module: 'Gestión de Usuarios',
      ip: '192.168.1.105',
    },
    {
      id: '3',
      timestamp: '2024-02-04 10:20:18',
      user: 'carlos.ramirez@aerocontrol.com',
      action: 'Error de Conexión',
      details: 'Falló la conexión con el sistema de reservas externo',
      level: 'error',
      module: 'Integraciones',
      ip: '192.168.1.110',
    },
    {
      id: '4',
      timestamp: '2024-02-04 10:15:33',
      user: 'ana.morales@aerocontrol.com',
      action: 'Exportación de Reporte',
      details: 'Generó reporte de vuelos mensual en formato PDF',
      level: 'info',
      module: 'Reportes',
      ip: '192.168.1.115',
    },
    {
      id: '5',
      timestamp: '2024-02-04 10:10:07',
      user: 'sistema@aerocontrol.com',
      action: 'Mantenimiento Programado',
      details: 'Inicio de mantenimiento programado del aeropuerto CTG',
      level: 'warning',
      module: 'Sistema',
      ip: 'localhost',
    },
    {
      id: '6',
      timestamp: '2024-02-04 10:05:51',
      user: 'diego.vargas@aerocontrol.com',
      action: 'Consulta de Datos',
      details: 'Consultó estadísticas de vuelos del último trimestre',
      level: 'info',
      module: 'Reportes',
      ip: '192.168.1.120',
    },
    {
      id: '7',
      timestamp: '2024-02-04 10:00:22',
      user: 'roberto.martinez@aerocontrol.com',
      action: 'Actualización de Sistema',
      details: 'Aplicó actualización de seguridad v2.1.3',
      level: 'success',
      module: 'Sistema',
      ip: '192.168.1.125',
    },
    {
      id: '8',
      timestamp: '2024-02-04 09:55:14',
      user: 'juan.perez@aerocontrol.com',
      action: 'Cambio de Estado',
      details: 'Cambió el estado del vuelo LA5678 de "A Tiempo" a "Demorado"',
      level: 'warning',
      module: 'Gestión de Vuelos',
      ip: '192.168.1.100',
    },
  ];

  filteredLogs: SystemLog[] = [];
  selectedLogLevel: string = '';
  selectedModule: string = '';
  selectedUser: string = '';
  logSearchTerm: string = '';

  // Opciones para filtros de logs
  logLevels = [
    { value: 'info', label: 'Información', color: 'primary' },
    { value: 'success', label: 'Éxito', color: 'success' },
    { value: 'warning', label: 'Advertencia', color: 'warning' },
    { value: 'error', label: 'Error', color: 'danger' },
  ];

  modules: string[] = [];
  users: string[] = [];

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.filteredLogs = [...this.systemLogs];
    this.extractLogFilters();
  }

  private extractLogFilters() {
    this.modules = [
      ...new Set(this.systemLogs.map((log) => log.module)),
    ].sort();
    this.users = [...new Set(this.systemLogs.map((log) => log.user))].sort();
  }

  // Acciones de reportes
  async onReportAction(report: ReportCard) {
    if (report.type === 'export') {
      this.showExportOptions();
      return;
    }

    const actionSheet = await this.actionSheetController.create({
      header: report.title,
      buttons: [
        {
          text: 'Ver Reporte Completo',
          icon: 'eye',
          handler: () => {
            this.viewFullReport(report);
          },
        },
        {
          text: 'Exportar PDF',
          icon: 'document',
          handler: () => {
            this.exportReport(report, 'pdf');
          },
        },
        {
          text: 'Exportar Excel',
          icon: 'grid',
          handler: () => {
            this.exportReport(report, 'excel');
          },
        },
        {
          text: 'Programar Envío',
          icon: 'mail',
          handler: () => {
            this.scheduleReport(report);
          },
        },
        {
          text: 'Actualizar Datos',
          icon: 'refresh',
          handler: () => {
            this.refreshReport(report);
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

  viewFullReport(report: ReportCard) {
    console.log('Ver reporte completo:', report);
    this.showToast(`Abriendo reporte: ${report.title}`);
  }

  async exportReport(report: ReportCard, format: 'pdf' | 'excel') {
    const loading = await this.toastController.create({
      message: `Generando reporte en ${format.toUpperCase()}...`,
      duration: 2000,
      position: 'bottom',
    });
    await loading.present();

    // Simular exportación
    setTimeout(() => {
      this.showToast(
        `Reporte ${report.title} exportado en ${format.toUpperCase()}`
      );
    }, 2000);
  }

  async scheduleReport(report: ReportCard) {
    const alert = await this.alertController.create({
      header: 'Programar Envío',
      message: `Configura el envío automático para: ${report.title}`,
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico',
        },
        {
          name: 'frequency',
          type: 'text',
          placeholder: 'Frecuencia (diario, semanal, mensual)',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Programar',
          handler: (data) => {
            if (data.email && data.frequency) {
              this.showToast(`Reporte programado para: ${data.email}`);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async refreshReport(report: ReportCard) {
    const toast = await this.toastController.create({
      message: `Actualizando ${report.title}...`,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();

    // Simular actualización
    setTimeout(() => {
      report.lastUpdated = new Date().toLocaleString();
      this.showToast('Datos actualizados');
    }, 1500);
  }

  async showExportOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Exportar Datos',
      buttons: [
        {
          text: 'Reporte de Vuelos',
          icon: 'airplane',
          handler: () => {
            this.customExport('flights');
          },
        },
        {
          text: 'Reporte de Usuarios',
          icon: 'people',
          handler: () => {
            this.customExport('users');
          },
        },
        {
          text: 'Reporte de Aeropuertos',
          icon: 'business',
          handler: () => {
            this.customExport('airports');
          },
        },
        {
          text: 'Logs del Sistema',
          icon: 'list',
          handler: () => {
            this.customExport('logs');
          },
        },
        {
          text: 'Reporte Personalizado',
          icon: 'create',
          handler: () => {
            this.createCustomReport();
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

  async customExport(type: string) {
    const toast = await this.toastController.create({
      message: `Generando reporte de ${type}...`,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async createCustomReport() {
    const toast = await this.toastController.create({
      message: 'Función de reporte personalizado en desarrollo',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  // Filtros de logs
  onLogSearchChange(event: any) {
    this.logSearchTerm = event.detail.value;
    this.applyLogFilters();
  }

  onLogFilterChange() {
    this.applyLogFilters();
  }

  applyLogFilters() {
    this.filteredLogs = this.systemLogs.filter((log) => {
      const matchesSearch =
        !this.logSearchTerm ||
        log.action.toLowerCase().includes(this.logSearchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(this.logSearchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(this.logSearchTerm.toLowerCase());

      const matchesLevel =
        !this.selectedLogLevel || log.level === this.selectedLogLevel;
      const matchesModule =
        !this.selectedModule || log.module === this.selectedModule;
      const matchesUser = !this.selectedUser || log.user === this.selectedUser;

      return matchesSearch && matchesLevel && matchesModule && matchesUser;
    });
  }

  clearLogFilters() {
    this.logSearchTerm = '';
    this.selectedLogLevel = '';
    this.selectedModule = '';
    this.selectedUser = '';
    this.filteredLogs = [...this.systemLogs];
  }

  // Utilidades
  getLevelColor(level: string): string {
    const logLevel = this.logLevels.find((l) => l.value === level);
    return logLevel ? logLevel.color : 'medium';
  }

  getLevelIcon(level: string): string {
    switch (level) {
      case 'info':
        return 'information-circle';
      case 'success':
        return 'checkmark-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  doRefresh(event: any) {
    console.log('Refreshing reports...');
    setTimeout(() => {
      // Actualizar timestamps de reportes
      this.reportCards.forEach((report) => {
        report.lastUpdated = new Date().toLocaleString();
      });
      this.applyLogFilters();
      event.target.complete();
      this.showToast('Reportes actualizados');
    }, 1500);
  }
}
