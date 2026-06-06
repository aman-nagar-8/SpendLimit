import React from 'react';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
  .btn {
    width: 100px;
    height: 30px;
    background: linear-gradient(to top, #F8FAFC, #E2E8F0, #FFFFFF);
    color: #000;
    border-radius: 20px;
    border: none;
    outline: none;
    cursor: pointer;
    position: relative;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  .btn span {
    font-size: 12px;
    font-weight: semibold;
    letter-spacing: 0px;
    transition: top 0.5s;
  }

  .btn-text-one {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  .btn-text-two {
    position: absolute;
    width: 100%;
    top: 150%;
    left: 0;
    transform: translateY(-50%);
  }

  .btn:hover .btn-text-one {
    top: -100%;
  }

  .btn:hover .btn-text-two {
    top: 50%;
  }`;