import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { SearchService } from 'src/app/services/search.service';
import { RoleService } from 'src/app/services/role.service';
import { ModalService } from 'src/app/services/modal.service';

import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  public allRoles: any[];
  public blockNext: boolean = false;
  public countUser: number;
  public currentUserCount: number = 0;
  public loading: boolean = true;
  public userList: User[];
  public newPhoto: File;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private searchService: SearchService,
    private modalService: ModalService
  ) {
    this.roleService.getAllRoles().subscribe(
      res => {
        this.allRoles = res.data;
      }
    )
  }

  isCurrentUser(userId) {
    let isCurrentUser = true;
    if (this.authService.uid === userId) {
      isCurrentUser = false;
    }
    return isCurrentUser;
  }

  ngOnInit(): void {
    this.modalService.resetData();
    this.loadUser();
  }

  changePage(isIncrement: number) {
    this.currentUserCount += isIncrement;

    if (this.currentUserCount < 0) {
      this.currentUserCount = 0;
    } else if (this.currentUserCount >= this.countUser) {
      this.currentUserCount -= isIncrement;
    }

    this.loadUser();
  }

  deleteUser(user) {
    Swal.fire({
      icon: `question`,
      title: `¿Desea elminiar el usuario?`,
      text: `Una vez eliminado el usuario ${user.mainName}, no podrá volver a acceder a sus datos.`,
      showCancelButton: true,
      confirmButtonColor: `#3085d6`,
      cancelButtonColor: `#d33`,
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user._id).subscribe(
          (res: any) => {
            this.loadUser();
            Swal.fire(
              `Usuario eliminado`,
              `El usuario ${res.data.firstName} ${res.data.firstSurname} ha sido elminado correctamente`,
              `success`
            );
            
            console.log('res: ', res);
          }
        );
        
      }
    });
  }

  loadUser() {
    this.loading = true;
    this.userService.getAllUsers(this.currentUserCount).subscribe(
      res => {
        this.userList = res.data.users;
        console.log('this.userList: ', this.userList);
        if (this.userList.length !== 0) {
          this.countUser = res.data.usersLength;
        }
        this.loading = false;
      }
    );
  }

  openModal(user: User) {
    this.modalService.showImgModal(this.userService.urlEntity, user);
  }

  search(term) {
    if (term === '') {
      this.loadUser();
    } else {
      this.searchService.search(this.userService.urlEntity, term).subscribe(
        res => {
          console.log('res: ', res);
          this.userList = res;
        }
      );
    }
  }

  updateRole(event, user: User) {
    const currentIndex = event.selectedIndex;
    const currentRol = this.allRoles[currentIndex];
    const newData: any = { ...user };
    newData.role = currentRol._id;
    this.userService.updateUser(newData, this.authService.uid).subscribe(
      (res: any) => {
        res.data.role = currentRol;
        user.updateData(res.data);
        Swal.fire(
          `Usuario actualizado`,
          `El usuario ${user.mainName} ha sido actualizado correctamente`,
          `success`
        );
      }
    );
  }
}
