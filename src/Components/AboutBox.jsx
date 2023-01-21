import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGamepad,
  faHome,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

export const AboutBox = (props) => {
  return (
    <div className="card shadow-sm card-left2 mb-4">
      <div className="card-body">
        <h5 className="mb-3 card-title">About me</h5>

        <p className="card-text">
          {" "}
          <FontAwesomeIcon icon={faBuilding} /> Work at{" "}
          <a href="#" className="text-decoration-none">
            {props.workplace}
          </a>
        </p>
        <p className="card-text">
          {" "}
          <FontAwesomeIcon icon={faHome} /> Live in{" "}
          <a href="#" className="text-decoration-none">
            {props.address}
          </a>
        </p>
        <p className="card-text">
          {" "}
          <FontAwesomeIcon icon={faGamepad} /> Hobbie(s){" "}
          <a href="#" className="text-decoration-none">
            {props.hobbies}
          </a>
        </p>
      </div>
    </div>
  )
}
