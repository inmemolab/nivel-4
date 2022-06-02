import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ArrayPost = () => {
  // useStates App

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <div className="input-group-append"></div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Crea uno Lista</h4>

        <ul className="list-group"></ul>
      </div>
      <div className="col-md-6"></div>
    </div>
  );
};

export default ArrayPost;
