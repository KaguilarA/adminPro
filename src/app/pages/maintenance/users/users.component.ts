import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { SearchService } from 'src/app/services/search.service';
import { RoleService } from 'src/app/services/role.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

import { User } from 'src/app/models/user.model';

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
    private userService: UserService,
    private roleService: RoleService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ) {
    this.roleService.getAllRoles().subscribe(
      res => {
        this.allRoles = res.data;
        console.log('this.allRoles : ', this.allRoles );
      }
    )
  }

  isCurrentUser(userId) {
    let isCurrentUser = true;
    if (this.userService.uid === userId) {
      isCurrentUser = false;
    }
    return isCurrentUser;
  }

  ngOnInit(): void {
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
    })
    

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
    this.modalImageService.showModal(user, `users`);
  }

  search(term) {
    if (term === '') {
      this.loadUser();
    } else {
      this.searchService.search(`user`, term).subscribe(
        res => {
          console.log('res: ', res);
          this.userList = res;
        }
      );
    }
    
  }

  updateRole(user) {
    this.userService.updateProfile(user).subscribe(
      (res: any) => {
        user.updateData(res.data);
      }
    );
  }

}
