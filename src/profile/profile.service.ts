import  { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
    getProfile() {
        return {
            name: 'Имя',
            secondName: 'Фамилия',
            score: 'ну что тут есть'
        }
    }
}