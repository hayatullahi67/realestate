import React from 'react';
import * as IconName from 'react-icons/hi';
import { FaUikit } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import Users from '../pages/Agent/Agent';

export const sidebarData = [
    {
        title: 'Dashboard',
        path: '/admin/',
        icon: <IconName.HiHome />,
        CName: 'nav-text'
    },
    
    {
        title: 'Agents',
        path: '/admin/agent',
        icon: <IconName.HiOutlinePhone />,
        CName: 'nav-text'
    },
    {
        title: 'Properties',
        path: '/admin/propertytracking',
        icon: <IconName.HiOutlineInboxIn />,
        CName: 'nav-text'
    },
    {
        title: 'Notification',
        path: '/admin/notifications',
        icon: <FaUikit />,
        CName: 'nav-text'
    },
   
];
