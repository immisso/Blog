/*
 * @Author: 柒叶
 * @Date: 2019-09-24 10:42:28
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-02 16:22:56
 */

import React from 'react';
import { Avatar } from 'antd';


const UserAvatar = props => (
  props.src
    ? (
      <Avatar
        size="large"
        src={props.src}
        // style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      />
    ) : (
      <Avatar
        size="large"
        icon="user"
        className="ft-24 mr-0"
      />
    )
);

export default UserAvatar;
