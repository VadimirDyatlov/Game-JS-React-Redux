/* eslint-disable no-mixed-operators */
function calcBulletTrajectory(state, cord) {
  const codrX = cord.payload.mouseCord[0] + state.hero.w / 5; // корды клика мышки по Х
  const codrY = cord.payload.mouseCord[1] - 50; // корды клика мышки по У
  const speed = 50; // скорость пули
  const heroX = state.hero.x + state.hero.w / 2; // корды героя по Х
  const heroY = state.hero.y + state.hero.h / 2; // корды героя по У
  const dX = codrX - heroX; // длинна катета Х героя и Х клика
  const dY = codrY - heroY; // длинна катета У героя и У клика
  const hypotenuse = Math.sqrt(dX ** 2 + dY ** 2); // гипотенуза
  const speedX = speed / hypotenuse * dX; // скорость по Х
  const speedY = speed / hypotenuse * dY; // скорость по У
  const corner = Math.asin(dY / hypotenuse);
  let g = (corner * 180 / Math.PI);
  if (heroX > codrX) {
    g = -g;
  }
  return [speedX, speedY, g];
}
export default calcBulletTrajectory;
