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

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  roleText: string;
  status: 'active' | 'inactive' | 'pending';
  statusText: string;
  lastLogin?: string;
  createdAt: string;
  avatar?: string;
  department?: string;
  phone?: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    BottomTabsComponent,
  ],
})
export class UsersPage implements OnInit {
  users: User[] = [
    {
      id: '1',
      firstName: 'Juan Carlos',
      lastName: 'Pérez García',
      email: 'juan.perez@aerocontrol.com',
      role: 'admin',
      roleText: 'Administrador',
      status: 'active',
      statusText: 'Activo',
      lastLogin: '2024-02-04 10:30',
      createdAt: '2024-01-15',
      department: 'Operaciones',
      phone: '+57 301 234 5678',
    },
    {
      id: '2',
      firstName: 'María José',
      lastName: 'González López',
      email: 'maria.gonzalez@aerocontrol.com',
      role: 'operator',
      roleText: 'Operador',
      status: 'active',
      statusText: 'Activo',
      lastLogin: '2024-02-04 09:15',
      createdAt: '2024-01-20',
      department: 'Control de Tráfico',
      phone: '+57 315 987 6543',
    },
    {
      id: '3',
      firstName: 'Carlos Eduardo',
      lastName: 'Ramírez Silva',
      email: 'carlos.ramirez@aerocontrol.com',
      role: 'operator',
      roleText: 'Operador',
      status: 'active',
      statusText: 'Activo',
      lastLogin: '2024-02-03 16:45',
      createdAt: '2024-01-25',
      department: 'Gestión de Vuelos',
      phone: '+57 312 456 7890',
    },
    {
      id: '4',
      firstName: 'Ana Patricia',
      lastName: 'Morales Díaz',
      email: 'ana.morales@aerocontrol.com',
      role: 'viewer',
      roleText: 'Visualizador',
      status: 'active',
      statusText: 'Activo',
      lastLogin: '2024-02-04 08:20',
      createdAt: '2024-02-01',
      department: 'Reportes',
      phone: '+57 320 123 4567',
    },
    {
      id: '5',
      firstName: 'Roberto',
      lastName: 'Martínez Cruz',
      email: 'roberto.martinez@aerocontrol.com',
      role: 'admin',
      roleText: 'Administrador',
      status: 'inactive',
      statusText: 'Inactivo',
      lastLogin: '2024-01-28 14:30',
      createdAt: '2024-01-10',
      department: 'Sistemas',
      phone: '+57 318 765 4321',
    },
    {
      id: '6',
      firstName: 'Laura Sofía',
      lastName: 'Jiménez Herrera',
      email: 'laura.jimenez@aerocontrol.com',
      role: 'operator',
      roleText: 'Operador',
      status: 'pending',
      statusText: 'Pendiente',
      createdAt: '2024-02-03',
      department: 'Control de Tráfico',
    },
    {
      id: '7',
      firstName: 'Diego Alejandro',
      lastName: 'Vargas Mendoza',
      email: 'diego.vargas@aerocontrol.com',
      role: 'viewer',
      roleText: 'Visualizador',
      status: 'active',
      statusText: 'Activo',
      lastLogin: '2024-02-04 07:45',
      createdAt: '2024-01-30',
      department: 'Auditoría',
      phone: '+57 314 567 8901',
    },
  ];

  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  selectedStatus: string = '';
  selectedDepartment: string = '';

  // Opciones para filtros
  roleOptions = [
    { value: 'admin', label: 'Administrador', color: 'danger' },
    { value: 'operator', label: 'Operador', color: 'primary' },
    { value: 'viewer', label: 'Visualizador', color: 'secondary' },
  ];

  statusOptions = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'pending', label: 'Pendiente' },
  ];

  departments: string[] = [];

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.filteredUsers = [...this.users];
    this.extractDepartments();
  }

  private extractDepartments() {
    this.departments = [
      ...new Set(
        this.users
          .filter((user) => user.department)
          .map((user) => user.department!)
      ),
    ].sort();
  }

  // Búsqueda y filtros
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredUsers = this.users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch =
        !this.searchTerm ||
        fullName.includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (user.department &&
          user.department
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()));

      const matchesRole = !this.selectedRole || user.role === this.selectedRole;
      const matchesStatus =
        !this.selectedStatus || user.status === this.selectedStatus;
      const matchesDepartment =
        !this.selectedDepartment || user.department === this.selectedDepartment;

      return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedRole = '';
    this.selectedStatus = '';
    this.selectedDepartment = '';
    this.filteredUsers = [...this.users];
  }

  // Utilidades
  getFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
  }

  getInitials(user: User): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(
      0
    )}`.toUpperCase();
  }

  getRoleColor(role: string): string {
    const roleOption = this.roleOptions.find((r) => r.value === role);
    return roleOption ? roleOption.color : 'medium';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'medium';
      case 'pending':
        return 'warning';
      default:
        return 'medium';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'active':
        return 'checkmark-circle';
      case 'inactive':
        return 'pause-circle';
      case 'pending':
        return 'time';
      default:
        return 'help-circle';
    }
  }

  // Acciones de usuario
  async onUserAction(user: User) {
    const actionSheet = await this.actionSheetController.create({
      header: `${this.getFullName(user)}`,
      buttons: [
        {
          text: 'Ver Perfil',
          icon: 'person-circle',
          handler: () => {
            this.viewUserProfile(user);
          },
        },
        {
          text: 'Editar Usuario',
          icon: 'create',
          handler: () => {
            this.editUser(user);
          },
        },
        {
          text: 'Cambiar Rol',
          icon: 'key',
          handler: () => {
            this.changeUserRole(user);
          },
        },
        {
          text: 'Cambiar Estado',
          icon: 'swap-horizontal',
          handler: () => {
            this.changeUserStatus(user);
          },
        },
        {
          text: 'Restablecer Contraseña',
          icon: 'lock-closed',
          handler: () => {
            this.resetPassword(user);
          },
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteUser(user);
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

  viewUserProfile(user: User) {
    console.log('Ver perfil del usuario:', user);
  }

  async editUser(user: User) {
    console.log('Editar usuario:', user);
    const toast = await this.toastController.create({
      message: 'Función de edición en desarrollo',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async changeUserRole(user: User) {
    const alert = await this.alertController.create({
      header: 'Cambiar Rol',
      message: `Selecciona el nuevo rol para ${this.getFullName(user)}`,
      inputs: this.roleOptions.map((role) => ({
        name: 'role',
        type: 'radio',
        label: role.label,
        value: role.value,
        checked: user.role === role.value,
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data) {
              const selectedRole = this.roleOptions.find(
                (r) => r.value === data
              );
              if (selectedRole) {
                user.role = data;
                user.roleText = selectedRole.label;
                this.showToast(`Rol actualizado a: ${selectedRole.label}`);
              }
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async changeUserStatus(user: User) {
    const alert = await this.alertController.create({
      header: 'Cambiar Estado',
      message: `Selecciona el nuevo estado para ${this.getFullName(user)}`,
      inputs: this.statusOptions.map((status) => ({
        name: 'status',
        type: 'radio',
        label: status.label,
        value: status.value,
        checked: user.status === status.value,
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            if (data) {
              const selectedStatus = this.statusOptions.find(
                (s) => s.value === data
              );
              if (selectedStatus) {
                user.status = data;
                user.statusText = selectedStatus.label;
                this.showToast(`Estado actualizado a: ${selectedStatus.label}`);
              }
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async resetPassword(user: User) {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      message: `¿Deseas enviar un enlace de restablecimiento de contraseña a ${user.email}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          handler: () => {
            this.showToast('Enlace de restablecimiento enviado');
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteUser(user: User) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar al usuario ${this.getFullName(
        user
      )}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.users = this.users.filter((u) => u.id !== user.id);
            this.applyFilters();
            this.showToast('Usuario eliminado correctamente');
          },
        },
      ],
    });
    await alert.present();
  }

  async addNewUser() {
    const toast = await this.toastController.create({
      message: 'Función de agregar usuario en desarrollo',
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
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
    console.log('Refreshing users...');
    setTimeout(() => {
      this.applyFilters();
      event.target.complete();
      this.showToast('Usuarios actualizados');
    }, 1500);
  }
}
