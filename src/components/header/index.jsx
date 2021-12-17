/** @jsx h */
import { h } from 'preact';
import style from './style.scss';

const Header = function({title}) {
  return (
    <header className={style.header}>
      <h1>{title}</h1>
    </header>
  )
}

export default Header;
