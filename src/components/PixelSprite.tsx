import React from 'react';
import { motion } from 'motion/react';
import { PetSpecies, PetStatus } from '../types';

interface PixelSpriteProps {
  species: PetSpecies;
  status: PetStatus;
  className?: string;
}

// Color Palette Map
const PALETTE: { [key: string]: string } = {
  '.': 'transparent',
  'k': '#000000', // Black Border
  'w': '#ffffff', // White
  'g': '#4cba52', // Slime green main
  'G': '#2f8534', // Slime green shadow
  'c': '#5dade2', // Cat light blue/grey
  'C': '#2874a6', // Cat shadow
  'o': '#e67e22', // Dragon orange/red
  'O': '#a04000', // Dragon shadow
  'y': '#f1c40f', // Yellow/Gold details
  'r': '#e74c3c', // Red heart/mouth
  'p': '#fd79a8', // Pink blush
  'a': '#7f8c8d', // Dead grey
  'A': '#34495e', // Dead dark grey
  'z': '#8e44ad', // Sleep purple Z
  'b': '#b37d4e', // Dog brown main
  'B': '#6e4726', // Dog brown shadow
  'n': '#e2dfd2', // Panda light grey/cream
  'q': '#d35400', // Chicken beak orange
  'm': '#fcd116', // Chicken body/crown yellow
};

// 16x16 Retropixel Sprite Matrices
const SPRITES: {
  [key in PetSpecies]: {
    [key in PetStatus]: string[];
  };
} = {
  slime: {
    idle: [
      '................',
      '......kkkk......',
      '....kkggggkk....',
      '...kggggggggk...',
      '..kggggggggggk..',
      '.kggggggggggggk.',
      '.kggkkggkkgggk.',
      'kgggkkgkkgkkgggK',
      'kgggggkkggkkggGK',
      'kggggggggggggGGK',
      'kggggggggggggGGK',
      '.kggGgGGGGGGgGk.',
      '..kkGGGGGGGGkk..',
      '....kkkkkkkk....',
      '................',
      '................',
    ],
    eating: [
      '......kkkk......',
      '....kkggggkk....',
      '...kggggggggk...',
      '..kggggggggggk..',
      '.kggggggggggggk.',
      '.kggkkggkkgggk.',
      'kgggkkgkkgkkgggK',
      'kggggkkrrkkggGK',
      'kgggggkkkkggggK',
      'kgggggwywywgggK',
      '.kgggGGGGGGGGk.',
      '..kkGGGGGGGGkk..',
      '....kkkkkkkk....',
      '................',
      '................',
      '................',
    ],
    playing: [
      '......kkkk......',
      '....kkggggkk....',
      '...kpgggggpkk...',
      '..kpgggggggpkk..',
      '.kggggggggggggk.',
      '.kggwkgwwkgwggk.',
      'kggggkkggkkgggkK',
      'kgggggkkkkggggGK',
      'kgggggwwrwwgGGK',
      '.kgggggggggGGk.',
      '..kkGGGGGGGkk...',
      '....kkkkkkk.....',
      '......k.k.......',
      '.....k.k.k......',
      '................',
      '................',
    ],
    sleeping: [
      '................',
      '......kkkk......',
      '....kkggggkk..zz',
      '...kggggggggk.z.',
      '..kggggggggggkz.',
      '.kggggggggggggk.',
      '.kggkkggkkgggk.',
      'kgggkkkkkkkkgggK',
      'kggggggggggggGGK',
      '.kggGgGGGGGGgGk.',
      '..kkGGGGGGGGkk..',
      '....kkkkkkkk....',
      '................',
      '................',
      '................',
      '................',
    ],
    dead: [
      '................',
      '................',
      '................',
      '................',
      '......kkkk......',
      '....kkabaakk....',
      '...kabaaaaaak...',
      '..kabaAaaAaaak..',
      '.kabaaaAaaAaaak.',
      '.kaakkkwwkkkaak.',
      'kabaaaaaaaaaaaAK',
      '.kkkkkAAAAAkkkk.',
      '....kkkkkkkk....',
      '................',
      '................',
      '................',
    ]
  },
  cat: {
    idle: [
      '...kk.....kk....',
      '..kcck...kcck...',
      '.kcccckkkcccck..',
      '.kcccccccccccck.',
      'kcccwccuwccwccK',
      'kcccckkcckkcccK',
      'kcccccrwwrccccK',
      'kcccccccccckkck',
      '.kccccccccckkck',
      '..kccccccckkck..',
      '...kccccccccck..',
      '....kcckkcckK...',
      '....kck..kckK...',
      '....kk...kk.....',
      '................',
      '................',
    ],
    eating: [
      '...kk.....kk....',
      '..kcck...kcck...',
      '.kcccckkkcccck..',
      '.kcccccccccccck.',
      'kcccwccuwccwccK',
      'kcccckkcckkcccK',
      'kcccccrwwrccccK',
      'kcccwwyyyywwcK.',
      '.kccwyyyywwck...',
      '..kcccccccccK...',
      '...kcccccccck...',
      '....kcckkcckK...',
      '....kck..kckK...',
      '....kk...kk.....',
      '................',
      '................',
    ],
    playing: [
      '...kk.....kk....',
      '..kcck...kcck.y.',
      '.kcccckkkcccckyy',
      '.kcccccccccccck.',
      'kcccpccuwpccpccK',
      'kcccckkcckkcccK',
      'kcccccrwwrccccK',
      'kcccccccccckkck',
      '.kcccccccwwkck.',
      '..kccccccckkck..',
      '..kccccccccccK..',
      '.kcckkcckkck....',
      'kck.kck.kck.....',
      'kk..kk..kk......',
      '................',
      '................',
    ],
    sleeping: [
      '................',
      '....kk.....kk...',
      '...kcck...kcck..',
      '..kcccckkkcccck.',
      '.kcccccccccccckz',
      'kcccckkcckkcccKz',
      'kcccccccccckkck.',
      '.kccccccccckkck.',
      '..kccccccccccK..',
      '...kcckkcckK....',
      '....kck..kck....',
      '....kk...kk.....',
      '................',
      '................',
      '................',
      '................',
    ],
    dead: [
      '................',
      '...kk.....kk....',
      '..kaak...kaak...',
      '.kaaakkkaaaak...',
      '.kaaaaaaaaaaaak.',
      'kaaaaakaakaaaaA',
      'kaaaakkcckkaaaA',
      'kaaaaaaaaaaaaaA',
      '.kaaaaaaaaaaaA..',
      '..kaaaaaaaaaA...',
      '...kaakaakaA....',
      '....kAa..kAa....',
      '....kk...kk.....',
      '................',
      '................',
      '................',
    ]
  },
  dragon: {
    idle: [
      '......kkkkk.....',
      '.....kooooykk...',
      '....koooooyyYk..',
      '...koookkkook...',
      '..koookkkkoooK..',
      '.kooookkkkoooK..',
      '..koooywwoooK...',
      '..koooyrroyyK...',
      '...koooyyyyK....',
      '....koooooyKkk..',
      '..kkkoooooyKyyK.',
      '.koyyoooooyKyyyK',
      '.kyykooooyKkkkk.',
      '..kk.kkkkkK.....',
      '................',
      '................',
    ],
    eating: [
      '......kkkkk.....',
      '.....kooooykk...',
      '....koooooyyYk..',
      '...koookkkook...',
      '..koookkkkoooK..',
      '.kooooywwyoooK..',
      '..koooyrroyyK...',
      '..koyyyyyyyyK...',
      '..kyyyyywwyyK...',
      '..kyyykyykyyKkk.',
      '.kkkkooooyKyyK.',
      '.koyyoooooyKyyyK',
      '.kyykooooyKkkkk.',
      '..kk.kkkkkK.....',
      '................',
      '................',
    ],
    playing: [
      '......kkkkk.y...',
      '.....kooooykky..',
      '....koooooyyYky.',
      '...koookkkook...',
      '..koookkkkoooK..',
      '.kooookkkkoooK..',
      '..koooywwoooK...',
      '..koooyrroyyK...',
      '...koooyyyyK....',
      '....koooooyKkk..',
      '..kkkoooooyKyyK.',
      '.koyyoooooyKyyyK',
      '.kyykooooyKkkkk.',
      '..kkkkk.kkkkK...',
      '..k.k...k.k.....',
      '................',
    ],
    sleeping: [
      '................',
      '......kkkkk.....',
      '.....kooooykk...',
      '....koooooyyYk.z',
      '...koookkkook..z',
      '..koookkkkoooK.z',
      '..koookkkkoooK..',
      '..koooykkkooK...',
      '..koooyyyyK.....',
      '...koooooyKkk...',
      '..kkkoooooyKyyK.',
      '.kyykooooyKkkkk.',
      '..kk.kkkkkK.....',
      '................',
      '................',
      '................',
    ],
    dead: [
      '......kkkkk.....',
      '.....kaaaaykk...',
      '....kaaaaayyAk..',
      '...kaaakkkaak...',
      '..kaaakkkkaaaA..',
      '.kaaaakkkkaaaA..',
      '..kaaaakaaaaA...',
      '..kaaakkkaaaA...',
      '...kaaaaaaaA....',
      '....kaaaaayAkk..',
      '..kkkaaaaayAaaA.',
      '.kaayaaaaayAaaaA',
      '.kaakaaaayAkkkk.',
      '..kk.kkkkkA.....',
      '................',
      '................',
    ]
  },
  dog: {
    idle: [
      '....kk.....kk...',
      '...kbbk...kbbk..',
      '..kbbbbkkkbbbbk.',
      '.kbbbbbbbbbbbbbk',
      '.kbbwbbuubbuwbbk',
      '.kbbkkbkkbkkbbbk',
      'kbbbbbbwwbbbbbbk',
      'kbbbbbbkkbbbbbbk',
      'kbbbbbbwwbbbbbbk',
      '.kbbbrrrrbbbbk..',
      '..kbbbrrrbbbk...',
      '...kbbbbbbbk....',
      '....kbbkkbbk....',
      '....kbk..kbk....',
      '....kk...kk.....',
      '................',
    ],
    eating: [
      '....kk.....kk...',
      '...kbbk...kbbk..',
      '..kbbbbkkkbbbbk.',
      '.kbbbbbbbbbbbbbk',
      '.kbbwbbuubbuwbbk',
      '.kbbkkbkkbkkbbbk',
      'kbbbbbbwwbbbbbbk',
      'kbbbyyykkkyyybbk',
      'kbbbywwywwywwbbk',
      '.kbbbrrrrbbbbk..',
      '..kbbbrrrbbbk...',
      '...kbbbbbbbk....',
      '....kbbkkbbk....',
      '....kbk..kbk....',
      '....kk...kk.....',
      '................',
    ],
    playing: [
      '....kk.....kk.y.',
      '...kbbk...kbbkyy',
      '..kbbbbkkkbbbbk.',
      '.kbbpbbbbbbpbbbk',
      '.kbbwbbuubbuwbbk',
      '.kbbkkbkkbkkbbbk',
      'kbbbbbbwwbbbbbbk',
      'kbbbbbbkkbbbbbbk',
      'kbbbbbbwwbbbbbbk',
      '.kbbbrrrrbbbbk..',
      '..kbbbrrrbbbk...',
      '...kbbbbbbbk....',
      '..kbbkkbbkkk....',
      '.kbk.kbk.kbk....',
      '.kk..kk..kk.....',
      '................',
    ],
    sleeping: [
      '................',
      '....kk.....kk...',
      '...kbbk...kbbk..',
      '..kbbbbkkkbbbbk.',
      '.kbbbbbbbbbbbbbk',
      '.kbbwbbuubbuwbbk',
      '.kbbkkkkkkkkbbbk',
      'kbbbbbbwwbbbbbbk',
      '.kbbbrrrrbbbbk.z',
      '..kbbbrrrbbbk..z',
      '...kbbbbbbbk...z',
      '....kbbkkbbk....',
      '....kbk..kbk....',
      '....kk...kk.....',
      '................',
      '................',
    ],
    dead: [
      '................',
      '....kk.....kk...',
      '...kaak...kaak..',
      '..kaaaakkkaaaak.',
      '.kaaaaaaaaaaaaak',
      '.kaaaakaakaaaaak',
      '.kaaakkkkkkaaaak',
      'kaaaaaaaaaaaaaak',
      '.kaaarrrraaaak..',
      '..kaaarrraaaK...',
      '...kaaaaaaaK....',
      '....kaakkAaK....',
      '....kak..kak....',
      '....kk...kk.....',
      '................',
      '................',
    ]
  },
  panda: {
    idle: [
      '.....kk.....kk..',
      '....kkkk...kkkk.',
      '...kkwwkkkkwwkkk',
      '..kwwwwwwwwwwwwk',
      '.kwwwkwwkwwwkwwk',
      '.kwwkkwwkwwkkwwk',
      'kwwwwwwkkwwwwwwK',
      'kwwwwwwwwwwwwwwK',
      'kwwwwwkkkkwwwwwK',
      '.kwwwnnnnnwwwnk.',
      '..kwnnnnnnnwnk..',
      '...kwnnnnnnwn...',
      '....kwnnknwn....',
      '.....kwnkwn.....',
      '......kk.kk.....',
      '................',
    ],
    eating: [
      '.....kk.....kk..',
      '....kkkk...kkkk.',
      '...kkwwkkkkwwkkk',
      '..kwwwwwwwwwwwwk',
      '.kwwwkwwkwwwkwwk',
      '.kwwkkwwkwwkkwwk',
      'kwwwwwwkkwwwwwwK',
      'kwwwwgkkkkggwwwK',
      'kwwwwggkkggwwwwK',
      '.kwwwnnnnnwwwnk.',
      '..kwnnnnnnnwnk..',
      '...kwnnnnnnwn...',
      '....kwnnknwn....',
      '.....kwnkwn.....',
      '......kk.kk.....',
      '................',
    ],
    playing: [
      '.....kk.....kk.y',
      '....kkkk...kkkky',
      '...kkwwkkkkwwkkk',
      '..kwwpwwwwwpwwwk',
      '.kwwwkwwkwwwkwwk',
      '.kwwkkwwkwwkkwwk',
      'kwwwwwwkkwwwwwwK',
      'kwwwwwwwwwwwwwwK',
      'kwwwwwkkkkwwwwwK',
      '.kwwwnnnnnwwwnk.',
      '..kwnnnnnnnwnk..',
      '...kwnnnnnnwn...',
      '..kwnnknwnnkn...',
      '.kwnkwnkwn......',
      '.kk..kk..kk.....',
      '................',
    ],
    sleeping: [
      '................',
      '.....kk.....kk..',
      '....kkkk...kkkk.',
      '...kkwwkkkkwwkkk',
      '..kwwwwwwwwwwwwk',
      '.kwwwkwwkwwwkwwk',
      '.kwwkkkkkkkkwwWk',
      'kwwwwwwkkwwwwwwK',
      'kwwwwwkkkkwwwwwK.z',
      '.kwwwnnnnnwwwnk.z',
      '..kwnnnnnnnwnk.z',
      '...kwnnnnnnwn...',
      '....kwnnknwn....',
      '.....kwnkwn.....',
      '......kk.kk.....',
      '................',
    ],
    dead: [
      '................',
      '.....kk.....kk..',
      '....kkkk...kkkk.',
      '...kkaakkkkaakkk',
      '..kaaaaaaaaaaaak',
      '.kaaaakaakaaaaak',
      '.kaaaaaaaaaaaaak',
      'kaaaaaakkkaaaaaA',
      'kaaaaaaaaaaaaaaA',
      '.kaaaannnnnaaaA.',
      '..kaannnnnnnaAA.',
      '...kaaaaaaaAa...',
      '....kaakkAa.....',
      '....kak..kak....',
      '....kk...kk.....',
      '................',
    ]
  },
  chicken: {
    idle: [
      '......rrrr......',
      '.....rmmmmr.....',
      '....kmmmmmmk....',
      '...kwwmmwwmmk...',
      '..kwwkkwwkkmk...',
      '..kmwwkwwkwmk...',
      '..kmmmqqqmmmk...',
      '..kmmqqqqqmmk...',
      '..kmmmmmmmmmk...',
      '.kmmmmmmmmmmmk..',
      '..kmmmmmmmmmk...',
      '...kkkkkkkkk....',
      '.....ky.ky......',
      '....kyy.kyy.....',
      '................',
      '................',
    ],
    eating: [
      '......rrrr......',
      '.....rmmmmr.....',
      '....kmmmmmmk....',
      '...kwwmmwwmmk...',
      '..kwwkkwwkkmk...',
      '..kmwwkwwkwmk...',
      '..kmmmqqqmmmk...',
      '..kmmqqqqqmmk...',
      '..kmmryryrmmk...',
      '.kmmmyyyyyymmk..',
      '..kmmmmmmmmmk...',
      '...kkkkkkkkk....',
      '.....ky.ky......',
      '....kyy.kyy.....',
      '................',
      '................',
    ],
    playing: [
      '......rrrr..y...',
      '.....rmmmmryy...',
      '....kmmmmmmky...',
      '...kppmmpmwmk...',
      '..kwwkkwwkkmk...',
      '..kmwwkwwkwmk...',
      '..kmmmqqqmmmk...',
      '..kmmqqqqqmmk...',
      '..kmmmmmmmmmk...',
      '.kmmmmmmmmmmmk..',
      '..kmmmmmmmmmk...',
      '...kkkkkkkkk....',
      '.....ky.ky......',
      '....kyy.kyy.....',
      '................',
      '................',
    ],
    sleeping: [
      '................',
      '......rrrr......',
      '.....rmmmmr.....',
      '....kmmmmmmk....',
      '...kwwmmwwmmk...',
      '..kwwkkkkkkmk...',
      '..kmwkkkkkkmk...',
      '..kmmmqqqmmmk..z',
      '..kmmqqqqqmmk..z',
      '..kmmmmmmmmmk..z',
      '.kmmmmmmmmmmk...',
      '...kkkkkkkkk....',
      '.....ky.ky......',
      '....kyy.kyy.....',
      '................',
      '................',
    ],
    dead: [
      '................',
      '......aaaa......',
      '.....raaaar.....',
      '....kaaaaaak....',
      '...kaaaaaaaak...',
      '..kaakaakaakA...',
      '..kaakaakaakA...',
      '..kaaaqqqaaaA...',
      '..kaaqqqqqaaA...',
      '..kaaaaaaaAaA...',
      '...kkkkkkkkkA...',
      '.....ka.ka......',
      '....kaa.kaa.....',
      '................',
      '................',
      '................',
    ]
  }
};

export const PixelSprite: React.FC<PixelSpriteProps> = ({ species, status, className }) => {
  const spriteMatrix = SPRITES[species]?.[status] || SPRITES.slime.idle;

  const [isBlinking, setIsBlinking] = React.useState(false);

  React.useEffect(() => {
    if (status === 'sleeping' || status === 'dead') {
      setIsBlinking(false);
      return;
    }

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 150); // Blink duration 150ms
    };

    // Blink every 2.5 to 5.0 seconds
    const interval = setInterval(() => {
      triggerBlink();
    }, 2500 + Math.random() * 2500);

    return () => clearInterval(interval);
  }, [status]);

  // Eye pixel coordinators mapping per species
  const EYE_MAP: { [key in PetSpecies]?: { rows: number[]; cols: number[]; replaceWith: string } } = {
    slime: { rows: [5, 6], cols: [4, 5, 8, 9], replaceWith: 'g' },
    cat: { rows: [5], cols: [5, 6, 8, 9], replaceWith: 'c' },
    dragon: { rows: [3], cols: [7, 8, 9], replaceWith: 'o' },
    dog: { rows: [5], cols: [4, 5, 9, 10], replaceWith: 'b' },
    panda: { rows: [5], cols: [4, 5, 11, 12], replaceWith: 'w' },
    chicken: { rows: [4], cols: [5, 6], replaceWith: 'w' }
  };

  // Custom motion keyframes/animation mappings depending on the state
  const getVariants = () => {
    switch (status) {
      case 'idle':
        return {
          animate: {
            y: [0, -1.5, 0],
            scaleY: [1, 0.98, 1.02, 1],
            scaleX: [1, 1.02, 0.98, 1],
            transition: {
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'eating':
        return {
          animate: {
            scaleX: [1, 1.03, 0.98, 1],
            scaleY: [1, 0.97, 1.02, 1],
            x: [0, -0.6, 0.6, 0],
            y: [0, -1, 0.3, 0],
            transition: {
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'playing':
        return {
          animate: {
            y: [0, -7, 0, -2, 0],
            scaleY: [1, 1.06, 0.95, 1.02, 1],
            scaleX: [1, 0.95, 1.06, 0.98, 1],
            transition: {
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'sleeping':
        return {
          animate: {
            scaleY: [1, 0.98, 1],
            y: [0, 0.4, 0],
            transition: {
              duration: 4.0,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'dead':
        return {
          animate: {
            opacity: [0.6, 0.8, 0.6],
            y: [0, 1, 0],
            transition: {
              duration: 4.0,
              repeat: Infinity,
              ease: "linear"
            }
          }
        };
      default:
        return {};
    }
  };

  const variants = getVariants();
  const eyeConfig = EYE_MAP[species];

  return (
    <motion.div 
      className={`relative inline-block ${className || ''}`}
      {...variants}
      style={{ imageRendering: 'pixelated' }}
    >
      <svg 
        viewBox="0 0 16 16" 
        className="w-full h-full"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {spriteMatrix.map((row, rIdx) => 
          row.split('').map((char, cIdx) => {
            const isEyePixel = isBlinking && eyeConfig && eyeConfig.rows.includes(rIdx) && eyeConfig.cols.includes(cIdx);
            const activeChar = isEyePixel ? eyeConfig.replaceWith : char;
            const fill = PALETTE[activeChar] || 'transparent';
            if (fill === 'transparent') return null;
            return (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx}
                y={rIdx}
                width={1.05} // Slightly larger to prevent subpixel gaps
                height={1.05}
                fill={fill}
              />
            );
          })
        )}
      </svg>
    </motion.div>
  );
};
