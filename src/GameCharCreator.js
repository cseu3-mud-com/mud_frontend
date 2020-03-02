import React, { useRef, useState, useEffect } from 'react';
import CharOptions from './CharOptions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useDebounce from './useDebounce';


const Canvas = styled.canvas`
  border: 1px solid #000;
`;

function GameCharCreator() {
  const [customization, setCustomization] = useState({
    'sex': {
      types: ['male', 'female'],
    },
    'body': {
      types: ['human', 'reptiles', 'orcs', 'skeleton', 'special', 'pregnant', 'child'],
      colors: [
        ['white', 'black', 'olive', 'brown', 'peach', 'light', 'dark', 'dark2', 'tanned', 'tanned2', 'muscular_white', 'muscular_dark']
      ],
      sprites: [
        ['body/male/{color}.png', 'body/female/{color}.png']
      ]
    },
    'hair': {
      types: [],
      sprites: []
    },
    'hats': {
      types: [],
      sprites: []
    },
    'eyes': {
      types: [],
      sprites: []
    },
    'facial': {
      types: [],
      sprites: []
    },
    'nose': {
      types: [],
      sprites: []
    },
    'ears': {
      types: [],
      sprites: []
    },
    'jacket': {
      types: [],
      sprites: []
    },
    'clothes': {
      types: [],
      sprites: []
    },
    'legs': {
      types: [],
      sprites: []
    },
    'shoes': {
      types: [],
      sprites: []
    },
    'boots': {
      types: [],
      sprites: []
    },
    'weapon': {
      types: [],
      sprites: []
    },
    'ammo': {
      types: [],
      sprites: []
    },
  });
  const [layers, setLayers] = useState([
    'sex',
    'body',
    'hats',
    'hair',
    'eyes',
    'facial',
    'nose',
    'ears',
    'jacket',
    'clothes',
    'legs',
    'shoes',
    'boots',
    'weapon',
    'ammo',
  ]);
  const [previewAnimation, setPreviewAnimation] = useState("walk");
  const [charDirection, setCharDirection] = useState('back');

  const [charGender, setCharGender] = useState(0);
  const [charBodyType, setCharBodyType] = useState(0);
  const [charBodyColor, setCharBodyColor] = useState(0);
  const [charHair, setCharHair] = useState(0);

  const spriteAnimations = {
    'stop': {
      start: 8,
      rows: [
        'stop_front',
        'stop_left',
        'stop_back',
        'stop_right',
      ],
      frames: 0
    },
    'spellcast': {
      start: 0,
      rows: [
        'spellcast_front',
        'spellcast_left',
        'spellcast_back',
        'spellcast_right',
      ],
      frames: 7
    },
    'thrust': {
      start: 4,
      rows: [
        'thrust_front',
        'thrust_left',
        'thrust_back',
        'thrust_right',
      ],
      frames: 8
    },
    'walk': {
      start: 8,
      rows: [
        'walk_front',
        'walk_left',
        'walk_back',
        'walk_right',
      ],
      frames: 9
    },
    'slash': {
      start: 12,
      rows: [
        'slash_front',
        'slash_left',
        'slash_back',
        'slash_right',
      ],
      frames: 6
    },
    'shoot': {
      start: 16,
      rows: [
        'shoot_front',
        'shoot_left',
        'shoot_back',
        'shoot_right',
      ],
      frames: 13
    },
    'hurt': {
      start: 20,
      rows: [
        'hurt_back',
      ],
      frames: 6
    },
  }

  // game canvas
  const canvasRef = useRef(null);

  const baseScale = 64;
  const maxAnimTime = 800;
  // current zoom scale, starts at 1x
  const [zoomScale, setZoomScale] = useState(1);
  // current frame of current animation
  const [currFrame, setCurrFrame] = useState(0);
  // current delay per frame, so all animations have the same end time
  const [currDelay, setCurrDelay] = useState(maxAnimTime / spriteAnimations[previewAnimation].frames);
  // time of each frame
  const animFrame = useDebounce(currFrame, currDelay);

  // Cache images
  const [sprites, setSprites] = useState({});

  const getCanvasContext = () => {
    return canvasRef.current ? canvasRef.current.getContext('2d') : null;
  }

  function loadImage(filename) {
    return new Promise(resolve => {
      let filenameKey = filename.replace(/[\\/.]/gi, '');
      const image = new Image();
      image.addEventListener('load', () => {
        resolve(image);
      });
      image.src = `spritesheets/${filename}`;
      setSprites({ ...sprites, [filenameKey]: image })
    });
  }

  const loadSprite = async (filename, ...args) => {
    let filenameKey = filename.replace(/[\\/.]/gi, '');
    let sprite = sprites[filenameKey] ? sprites[filenameKey] : null;
    if (!sprite) {
      return await loadImage(filename)
    }
    return sprite;
  }

  const getScale = () => baseScale * zoomScale;
  const getCharBodySprite = () => {
    const bodyColor = customization['body'].colors[charBodyType][charBodyColor];
    const bodySprite = customization['body'].sprites[charBodyType][charGender];
    return `${bodySprite.replace('{color}', bodyColor)}`
  }

  const drawPreview = async () => {
    const ctx = getCanvasContext();

    const bodySprite = await loadSprite(getCharBodySprite())

    // const img = await loadSprite('body/male/light.png'); // customization

    const { zoom, frames, rowStart } = getCurrSpriteInfo();
    // console.log(previewAnimation, currFrame, rowStart, rows.length)
    ctx.clearRect(0, 0, zoom, zoom);
    ctx.drawImage(bodySprite, currFrame * 64, rowStart * 64, 64, 64, 0, 0, zoom, zoom);
    if (frames > 0) {
      if (currFrame + 1 < frames) {
        setCurrFrame(frame => frame + 1)
      } else {
        setCurrFrame(frame => 0)
      }
    }
  }

  const getCurrSpriteInfo = () => {
    const spriteAnim = spriteAnimations[previewAnimation];
    const rows = spriteAnim.rows;
    const frames = spriteAnim.frames;
    const rowIndex = rows.indexOf(`${previewAnimation}_${charDirection}`);
    const rowStart = spriteAnim.start + rowIndex;
    const zoom = getScale();
    return {
      zoom,
      rows,
      frames,
      rowStart,
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', function (e) {
      const key = e.which;
      if ([37, 38, 39, 40].includes(key)) e.preventDefault();
      else return;
      // console.log(key);
      switch (key) {
        case 37:
          setCharDirection('left');
          break;
        case 38:
          setCharDirection('front');
          break;
        case 39:
          setCharDirection('right');
          break;
        case 40:
          setCharDirection('back');
          break;
        default:
          break;
      }
    });
    return () => {
      document.removeEventListener('keydown')
    }
  }, []);

  useEffect(() => {
    // console.log('drawing', animFrame, previewAnimation)
    drawPreview()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animFrame, charDirection, previewAnimation]);

  const previewOnChange = (e) => {
    let newAnim = e.target.value;
    if (newAnim === 'stop') {
      setCharDirection('back');
      setCurrFrame(frame => 0);
    }
    setPreviewAnimation(newAnim);
    setCurrDelay(maxAnimTime / spriteAnimations[newAnim].frames);
  }

  const zoomOnChange = (e) => {
    const newZoom = e.target.value;
    setZoomScale(newZoom);
  }

  const directionOnChange = (e) => {
    const { value } = e.target;
    setCharDirection(value)
  }
  const bodyTypeOnChange = (e) => {
    const { value } = e.target;
    setCharBodyType(value)
  }
  const bodyColorOnChange = (e) => {
    const { value } = e.target;
    setCharBodyColor(value)
  }
  const genderOnChange = (e) => {
    const { value } = e.target;
    setCharGender(value)
  }
  const hairOnChange = (e) => {
    const { value } = e.target;
    setCharHair(value)
  }

  return <div className="characterCreation">
    <div id="previewAnimationsBox">
      Preview Animation:
		  <select id="whichAnim" name="previewAnimation" value={previewAnimation} onChange={previewOnChange}>
        {
          Object.keys(spriteAnimations).map(
            (anim) => <option
              key={`anim_${anim}`}
              value={anim}
            >
              {anim[0].toUpperCase() + anim.slice(1)}
            </option>
          )
        }
      </select>
      <br />
      <br />
      Zoom:
      <input type="number" value={zoomScale} onChange={zoomOnChange} />
      <br />
      <br />
      Direction:
		  <select name="direction" value={charDirection} onChange={directionOnChange}>
        {
          ['front', 'left', 'back', 'right'].map(
            (dir, i) => <option
              key={`direction_${dir}`}
              value={dir}
            >
              {dir[0].toUpperCase() + dir.slice(1)}
            </option>
          )
        }
      </select>
      <br />
      <br />
      Body Type:
		  <select name="bodyType" value={charBodyType} onChange={bodyTypeOnChange}>
        {
          customization['body'].types.map(
            (type, i) => <option
              key={`body_${type}`}
              value={i}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </option>
          )
        }
      </select>
      <br />
      <br />
      Body Color:
		  <select name="bodyColor" value={charBodyColor} onChange={bodyColorOnChange}>
        {
          customization['body'].colors[charBodyType].map(
            (color, i) => <option
              key={`${customization['body'].types[charBodyType]}_${color}`}
              value={i}
            >
              {color[0].toUpperCase() + color.slice(1)}
            </option>
          )
        }
      </select>
      <br />
      <br />
      Gender:
		  <select name="gender" value={charGender} onChange={genderOnChange}>
        {
          customization['sex'].types.map(
            (gender, i) => <option
              key={`sex_${gender}`}
              value={i}
            >
              {gender[0].toUpperCase() + gender.slice(1)}
            </option>
          )
        }
      </select>
      <br />
      <br />
      Hair:
		  <select name="hair" value={charHair} onChange={hairOnChange}>
        {
          customization['hair'].types.map(
            (type, i) => <option
              key={`hair_${type}`}
              value={i}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </option>
          )
        }
      </select>
      <br />
      <br />
      <Canvas id="characterPreview" ref={canvasRef} width={getScale()} height={getScale() * 1.2}></Canvas>
    </div>
  </div>;
}

export default GameCharCreator;