import React from 'react'
import {MdAccountBox} from 'react-icons/md'
import {HiSave} from 'react-icons/hi'
import {MdForum} from 'react-icons/md'
import {HiShoppingBag} from 'react-icons/hi'
import {FaShoppingCart} from 'react-icons/fa'

export const SidebarData = [
    {
        title: 'BUY CARS',
        path: '/buycars',
        icon: <HiShoppingBag/>,
    }
    ,
    {
        title: 'SELL CARS',
        path: '/sellcars',
        icon: <FaShoppingCart/>,
    },
    {
        title: 'MESSAGES',
        path: '/messages',
        icon: <MdForum/>,
    },
    {
        title: 'SAVED CARS',
        path: '/savedcars',
        icon: <HiSave/>,
    },
    {
        title: 'PROFILE',
        path: '/profile',
        icon: <MdAccountBox/>,
    }
]