/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getHero,
} from '../../store/gameReducer/gameReducer';
import {
  getHeroUpgrade, getUserGold, UpgradeHp, UpgradeDamage, UpgradeSpeed, sendUpgradeSkills,
} from '../../store/upgradeReducer/upgradeReducer';
import { calcUpgrade, radianceNumbers } from '../functions';
// import { buy } from '../../store/userReducer/reducer';
import './UpgradeHero.css';

function UpgradeHero() {
  console.log('render');
  const dispatch = useDispatch();
  const refHp = useRef();
  const refDamage = useRef();
  const refSpeed = useRef();
  const { user } = useSelector((state) => state.auth);
  const { hero } = useSelector((state) => state.game);
  const { UpgradeHeroValue, upSkillsСonstants, UpgradeGold } = useSelector((state) => state.hero);
  console.log('up', UpgradeHeroValue);
  console.log('hero', hero);

  useEffect(() => {
    dispatch(getHero());
    dispatch(getHeroUpgrade());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserGold({ gold: user.gold }));
  }, [user.gold]);

  const handleClickHpUp = () => {
    dispatch(UpgradeHp(calcUpgrade('up', upSkillsСonstants, UpgradeHeroValue, 'hp', UpgradeGold, refHp)));
  };
  const handleClickHpDown = () => {
    dispatch(UpgradeHp(calcUpgrade('down', upSkillsСonstants, UpgradeHeroValue, 'hp', UpgradeGold, refHp, user.gold, hero)));
  };
  const handleClickDamageUp = () => {
    dispatch(UpgradeDamage(calcUpgrade('up', upSkillsСonstants, UpgradeHeroValue, 'damage', UpgradeGold, refDamage)));
  };
  const handleClickDamageDown = () => {
    dispatch(UpgradeDamage(calcUpgrade('down', upSkillsСonstants, UpgradeHeroValue, 'damage', UpgradeGold, refDamage, user.gold, hero)));
  };
  const handleClickSpeedUp = () => {
    dispatch(UpgradeSpeed(calcUpgrade('up', upSkillsСonstants, UpgradeHeroValue, 'speed', UpgradeGold, refSpeed)));
  };
  const handleClickSpeedDown = () => {
    dispatch(UpgradeSpeed(calcUpgrade('down', upSkillsСonstants, UpgradeHeroValue, 'speed', UpgradeGold, refSpeed, user.gold, hero)));
  };
  const handleClickSendUpgradeSkills = () => {
    dispatch(sendUpgradeSkills({ skills: UpgradeHeroValue, gold: UpgradeGold }));
    // dispatch(getHero());
    // dispatch(getHeroUpgrade());
    console.log({ skills: UpgradeHeroValue, gold: UpgradeGold });
  };
  return (
    <>
      <div className="nes-container is-rounded is-dark profile__wrapper anim-show-profile__hero">
        <h1>
          <span className="blue">UPGRADE</span>
          {' '}
          <span className="yellow">HERO!</span>
        </h1>
        <div className="form__wrapper">
          {hero.hp && (
            <>
              <span className="span-update">
                {/* <div className="update">LVL</div>
                <div className="update">{hero.lvl}</div> */}
                <div className="update">{`GOLD ${UpgradeGold}`}</div>
                <div className="update">price</div>
              </span>
              <span className="span-update">
                <div className="update">
                  {'HP: '}
                  <span ref={refHp}>
                    {UpgradeHeroValue.hp}
                  </span>
                </div>
                <div className="update-container">
                  <button
                    onClick={handleClickHpDown}
                    type="button"
                    className="update nes-btn"
                  >
                    -
                  </button>
                  <div className="update">
                    {`${calcUpgrade('price', upSkillsСonstants, UpgradeHeroValue, 'hp')} GOLD`}
                  </div>
                  <button
                    onClick={handleClickHpUp}
                    type="button"
                    className="update__button nes-btn"
                  >
                    +
                  </button>
                </div>
              </span>
              <span className="span-update">
                <div className="update">
                  {'DAMAGE: '}
                  <span ref={refDamage}>
                    {UpgradeHeroValue.damage}
                  </span>
                </div>
                <div className="update-container">
                  <button
                    onClick={handleClickDamageDown}
                    type="button"
                    className="update__button nes-btn"
                  >
                    -
                  </button>
                  <div className="update">
                    {`${calcUpgrade('price', upSkillsСonstants, UpgradeHeroValue, 'damage')} GOLD`}
                  </div>
                  <button
                    onClick={handleClickDamageUp}
                    type="button"
                    className="update__button nes-btn"
                  >
                    +
                  </button>
                </div>
              </span>
              <span className="span-update">
                <div className="update">
                  {'SPEED: '}
                  <span ref={refSpeed}>
                    {UpgradeHeroValue.speed}
                  </span>
                </div>
                <div className="update-container">
                  <button
                    onClick={handleClickSpeedDown}
                    type="button"
                    className="update__button nes-btn"
                  >
                    -
                  </button>
                  {`${calcUpgrade('price', upSkillsСonstants, UpgradeHeroValue, 'speed')} GOLD`}
                  <button
                    onClick={handleClickSpeedUp}
                    type="button"
                    className="update nes-btn"
                  >
                    +
                  </button>
                </div>
              </span>
              <button type="button" onClick={handleClickSendUpgradeSkills}>УЛУЧШИТЬ</button>
            </>
          )}
        </div>
      </div>
      <div className="score-box-profile">
        <p className="score-profile" />
        <Link className="return-rating btn-back" to="/">
          &lt;&lt; НАЗАД
        </Link>
      </div>
    </>
  );
}

export default UpgradeHero;
