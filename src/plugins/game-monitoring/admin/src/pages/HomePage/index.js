/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import axios from 'axios';

const HomePage = () => {
  const [deposit, setDeposit] = useState(null);
  const jwt = "";
  const getDeposit = async () => {
    try {
      await axios("localhost:1337/api/request-deposits", {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }).then((res) => {
        setDeposit(res.data);
      }).catch((err) => {
        setDeposit(err)
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDeposit();
  }, []);
  return (
    <div>
      deposit
    </div>
  );
};

export default memo(HomePage);

