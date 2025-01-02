import NavBar1 from '../../components/NavBar1/NavBar1';
import style from './style.module.css';
import React from 'react'
import withTheme from '../../components/ThemeComponent/ThemeComponent';
import WorkSpaceBody from '../../components/WorkSpaceBody/WorkSpaceBody';
import Modal from './../../components/Modal/Modal';
import { useTheme } from '../../context/ThemeContext';
function WorkSpace() {
    const {theme}=useTheme();
    // console.log(theme)
  return (
    <div className={style.container}>
      {/* <Modal theme={theme}/> */}
      <NavBar1/>
      <WorkSpaceBody/>
    </div>
  )
}

export default withTheme(WorkSpace);
