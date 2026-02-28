import s from "../styles/components.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <div className={s.logo}>
          <div className={s.logoMark}>S</div>
          <div>
            <div className={s.logoName}>Vraj</div>
            <div className={s.logoSub}>AI Guest Communications Hub</div>
          </div>
        </div>
        <div className={s.statusDot}>
          <span className={s.pulse} />
          <span className={s.statusText}>Live</span>
        </div>
      </div>
    </header>
  );
}
