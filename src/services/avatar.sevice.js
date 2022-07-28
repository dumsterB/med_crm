import { random } from 'lodash';

export class AvatarService {
  static imagesCountsByGender = 2;
  static colors = ['#F7CFE0', '#FAECBE', '#DAD7FF', '#D2F5EB'];

  /**
   * @param { User.gender } gender
   * @return {string} return absolute url to image
   */
  static getRandomAvatarUrl({ gender }) {
    const imageName = `${gender}_${random(0, this.imagesCountsByGender - 1)}`;
    return `/assets/images/avatars/${imageName}.png`;
  }

  static getRandomAvatarBg() {
    return this.colors[random(0, this.colors.length - 1)];
  }
}
