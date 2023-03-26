import "./index.css";
import RotateBlast from "./RotateBlast";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const rotateBlast = new RotateBlast(canvas);

rotateBlast.start();
