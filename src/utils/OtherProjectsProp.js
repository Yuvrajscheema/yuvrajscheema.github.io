const repositories = [
  {
    id: 1,
    name: 'Drone From Scratch',
    description:
      'An ongoing quest to build a racing drone entirely from scratch — including a custom three-phase ESC (25 kHz, 20 A) running sensorless field-oriented control, written in Rust on an ARM Cortex-M33.',
    language: ['Rust', 'KiCad'],
    html_url: 'https://codeberg.org/Yuvraj/rp_pi_esc_firmware',
    homepage: 'https://codeberg.org/Yuvraj/rp_pi_esc_firmware',
  },
  {
    id: 2,
    name: 'Machine Learning Robot',
    description:
      'A ROS codebase built for a simulated robot competition, combining YOLO object detection, CNNs, and imitation learning to drive the course autonomously.',
    language: ['Python', 'ROS'],
    html_url: 'https://github.com/ELM-ERS/ENPH353_Comp',
    homepage: 'https://github.com/ELM-ERS/ENPH353_Comp',
  },
  {
    id: 3,
    name: 'ESP32 WifiTuner',
    description:
      'A Wi-Fi-based tuning tool for any control system — adjust PID gains remotely from a browser and watch the error response live, with no reflashing required.',
    language: ['C++', 'HTML', 'JS'],
    html_url: 'https://github.com/Yuvrajscheema/wifiTuning',
    homepage: 'https://github.com/Yuvrajscheema/wifiTuning',
  },
  {
    id: 4,
    name: 'FIRST Robotics',
    description:
      'Two years as lead programmer of my high school\'s robotics team, building a competition robot with ML-based object detection that placed 4th at the Canadian Pacific Regional.',
    language: ['Java', 'ML'],
    html_url: '',
    homepage: 'https://reybots.ca',
  },
  {
    id: 5,
    name: 'Neovim Configuration',
    description:
      'My custom Neovim configuration, tailored for developing in C, C++, Python, and Rust.',
    language: ['Lua', 'Vimscript'],
    html_url: 'https://github.com/Yuvrajscheema/nvim',
    homepage: 'https://github.com/Yuvrajscheema/nvim',
  },
  {
    id: 6,
    name: 'Dotfiles',
    description:
      'My minimalist Arch Linux setup, built around Hyprland and Quickshell.',
    language: ['QML', 'Bash'],
    html_url: 'https://codeberg.org/Yuvraj/dotfiles',
    homepage: 'https://codeberg.org/Yuvraj/dotfiles',
  },
  {
    id: 7,
    name: 'Markdown Notes',
    description:
      'The Obsidian vault of notes I\'ve kept throughout Engineering Physics — everything from circuits to control theory.',
    language: ['LaTeX', 'Markdown'],
    html_url: 'https://github.com/Yuvrajscheema/notes',
    homepage: 'https://github.com/Yuvrajscheema/notes',
  },
];

export default repositories;
