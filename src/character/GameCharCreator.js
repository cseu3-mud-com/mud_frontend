import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce';

const Canvas = styled.canvas`
  border: 1px solid #000;
`;

function GameCharCreator() {
  // eslint-disable-next-line no-unused-vars
  const [customization, setCustomization] = useState({
    'direction': {
      types: ['back', 'front', 'left', 'right']
    },
    'sex': {
      types: ['male', 'female'],
    },
    'body': {
      types: ['human'], // 'reptiles', 'orcs', 'skeleton', 'special', 'pregnant', 'child'
      colors: [
        ['white', 'black', 'olive', 'brown', 'peach', 'light', 'dark', 'dark2', 'tanned', 'tanned2'] //  'muscular_white', 'muscular_dark'
      ],
      sprites: 'body/{sex}/{color}.png'
    },
    'hair': {
      types: ['plain', 'bedhead'],
      types_sex: [
        ['male'], ['male']
      ],
      colors: [
        ['blonde', 'blue', 'brunette', 'green', 'pink', 'raven', 'dark_blonde', 'white_blonde'],
        ['blonde', 'blue', 'brunette', 'green', 'pink', 'raven', 'redhead', 'white_blonde'],
      ],
      sprites: 'hair/{sex}/{type}/{color}.png'
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

  const [previewAnimation, setPreviewAnimation] = useState("walk");
  const [charDirection, setCharDirection] = useState(0);
  const [charGender, setCharGender] = useState(0);
  const [charBodyType, setCharBodyType] = useState(0);
  const [charBodyColor, setCharBodyColor] = useState(0);
  const [charHairType, setCharHairType] = useState(0);
  const [charHairColor, setCharHairColor] = useState(0);

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
      console.log('loaded', filename)
      return await loadImage(filename)
    }
    return sprite;
  }

  const getScale = () => baseScale * zoomScale;
  const getCharBodySprite = () => {
    const getCharGender = customization['sex'].types[charGender]
    const bodyColor = customization['body'].colors[charBodyType][charBodyColor];
    const bodySprite = customization['body'].sprites;
    return `${bodySprite.replace('{sex}', getCharGender).replace('{color}', bodyColor)}`
  }
  const getCharHairSprite = () => {
    const getCharGender = customization['sex'].types[charGender]
    const getCharHairType = customization['hair'].types[charHairType]
    const getHairColor = customization['hair'].colors[charHairType][charHairColor]
    const hairSprite = customization['hair'].sprites;
    return `${hairSprite.replace('{sex}', getCharGender).replace('{type}', getCharHairType).replace('{color}', getHairColor)}`
  }

  const drawPreview = async () => {
    const ctx = getCanvasContext();

    const bodySprite = await loadSprite(getCharBodySprite())
    const hairSprite = await loadSprite(getCharHairSprite())
    // const img = await loadSprite('body/male/light.png'); // customization 

    const { zoom, frames, rowStart } = getCurrSpriteInfo();
    // console.log(previewAnimation, currFrame, rowStart, rows.length)
    const layers = [bodySprite, hairSprite]
    ctx.clearRect(0, 0, zoom, zoom * 1.2);
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, zoom, zoom * 1.2);

    layers.forEach(layer => {
      ctx.drawImage(layer, currFrame * 64, rowStart * 64, 64, 64, 0, 0, zoom, zoom);
    })
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
    const rowIndex = rows.indexOf(`${previewAnimation}_${customization['direction'].types[charDirection]}`);
    const rowStart = spriteAnim.start + rowIndex;
    const zoom = getScale();
    return {
      zoom,
      rows,
      frames,
      rowStart,
    }
  }

  // add keyboard functionality to arrows
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

  // canvas draw
  useEffect(() => {
    // console.log('drawing', animFrame, previewAnimation)
    drawPreview()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animFrame, charDirection, previewAnimation]);

  // update auto generated fields value
  useEffect(() => {
    console.log('what')
    setFormFieldsData([
      charDirection,
      charBodyType,
      charBodyColor,
      charGender,
      charHairType,
      charHairColor
    ]);
  }, [
    charDirection,
    charBodyType,
    charBodyColor,
    charGender,
    charHairType,
    charHairColor
  ]);

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
    const { value } = e.target.value;
    setZoomScale(value);
  }

  const formOnChange = [
    setCharDirection,
    setCharBodyType,
    setCharBodyColor,
    setCharGender,
    (newHairType) => {
      setCharHairType(newHairType)
      setFormFieldsDataOptions(s => {
        s[5] = customization['hair'].colors[newHairType]
        return s;
      })
    },
    setCharHairColor,
  ];
  const formFields = [
    'direction',
    'bodyType',
    'bodyColor',
    'gender',
    'hairType',
    'hairColor'
  ];
  const [formFieldsData, setFormFieldsData] = useState([
    charDirection,
    charBodyType,
    charBodyColor,
    charGender,
    charHairType,
    charHairColor
  ]);
  const [formFieldsDataOptions, setFormFieldsDataOptions] = useState([
    customization['direction'].types,
    customization['body'].types,
    customization['body'].colors[charBodyType],
    customization['sex'].types,
    customization['hair'].types,
    customization['hair'].colors[charHairType]
  ]);
  const createCharSelectFields = () => {
    const fieldOnChange = (setState) => e => {
      const { value } = e.target;
      setState(value);
    }
    return formFields.map((field, i) => (<div key={`char${field}`} className={`charOption char${field}`}>
      <h4>{field}:</h4>
      <select name={field} value={formFieldsData[i]} onChange={fieldOnChange(formOnChange[i])}>
        {
          formFieldsDataOptions[i].map(
            (info, index) => <option
              key={`${field}_${info}`}
              value={index}
            >
              {info[0].toUpperCase() + info.slice(1)}
            </option>
          )
        }
      </select>
    </div>));
  }

  return <div className="characterCreation">
    <div className="flex two">
      <div className="column">
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
        {createCharSelectFields()}
      </div>
      <div className="column">
        <Canvas id="characterPreview" ref={canvasRef} width={getScale()} height={getScale() * 1.2}></Canvas>
      </div>
    </div>
  </div>
}

export default GameCharCreator;