import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary'
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.showBD){
        attachedClasses = [classes.SideDrawer,classes.Open]
    }
    return (
        <Auxilliary>
            <BackDrop show={props.showBD} click={props.close}/>
            <div className={attachedClasses.join(' ')} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isauthProp={props.isAuthenticated}/>
                </nav>
            </div>
        </Auxilliary>

    )
}

export default sideDrawer;