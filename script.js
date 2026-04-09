// Mobile nav, smooth scroll, product modal handling, and AJAX form submit
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      if (open) mainNav.querySelector('a')?.focus();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
        if (mainNav && mainNav.classList.contains('open')) mainNav.classList.remove('open');
      }
    });
  });

  // Product data (unchanged)...
const products = {

  /* ───────────── TELEVISIONS ───────────── */

  p1: {
    name: '32 Inch Televisions',
    specs: 'HD Ready • Smart LED TVs',
    desc: '32” HD Ready and Smart LED TVs with Android/Google TV support — ideal for bedrooms and small rooms.',
    img: '32inch1.png'
  },

  p2: {
    name: '43 Inch Televisions',
    specs: 'FHD • 4K • QLED • OLED',
    desc: '43” Full HD, 4K, QLED and OLED TVs with HDR support — perfect for living rooms and gaming.',
    img: '43inch1.png'
  },

  p3: {
    name: '55 Inch Televisions',
    specs: '4K • QLED • OLED',
    desc: '55” 4K, QLED and OLED TVs offering cinematic visuals and HDR performance — best for home theatres.',
    img: '55inch1.png'
  },

  p4: {
    name: '65 Inch Televisions',
    specs: '4K • QLED • OLED • Mini-LED',
    desc: '65” premium TVs including QLED, OLED and Mini-LED with Dolby Vision — made for premium viewing.',
    img: '65inch1.png'
  },

  p5: {
    name: '85 Inch Televisions',
    specs: '4K • QLED • OLED',
    desc: '85” large-screen TVs delivering stadium-like viewing — suitable for villas and large halls.',
    img: '85inch1.png'
  },

  p6: {
    name: '100 Inch Televisions',
    specs: '4K • Mini-LED • OLED',
    desc: '100” ultra-premium TVs with extreme brightness and luxury home-cinema experience.',
    img: '100inch1.png'
  },

  /* ───────────── REFRIGERATORS ───────────── */

  p7: {
    name: 'Single Door Refrigerators',
    specs: 'Direct Cool • Energy Efficient',
    desc: '183L, 190L and 210L single door refrigerators with direct cool technology and inverter options — ideal for bachelors and small families.',
    img: 'sd2.avif'
  },

  p8: {
    name: 'Double Door Refrigerators',
    specs: 'Frost Free • Multi-Air Flow',
    desc: '232L, 260L and 284L frost-free double door refrigerators with convertible freezer and digital inverter — suitable for medium families.',
    img: 'ff2.avif'
  },

  p9: {
    name: 'CBU Refrigerators',
    specs: 'Premium • Convertible Modes',
    desc: '298L, 345L and 466L premium CBU refrigerators with inverter compressor and digital display — perfect for large families.',
    img: 'cbu2.avif'
  },

  p10: {
    name: 'Side By Side Refrigerators',
    specs: 'Frost Free • Inverter Compressor',
    desc: '500L, 600L and 700L side-by-side refrigerators with smart connectivity and premium glass finish — designed for luxury kitchens.',
    img: 'sbs2.avif'
  },

  p11: {
    name: 'French Door Refrigerators',
    specs: 'Premium • Multi Air Flow',
    desc: '450L, 550L and 650L French door refrigerators with twin cooling and smart temperature control — ideal for modern homes.',
    img: 'fdr2.avif'
  },

  p12: {
    name: 'Triple Door Refrigerators',
    specs: 'Frost Free • Convertible Storage',
    desc: '240L, 300L and 350L triple door refrigerators with independent cooling zones — built for organized family storage.',
    img: 'tdr2.avif'
  },

  p13: {
    name: 'Mini Refrigerators',
    specs: 'Direct Cool • Compact Design',
    desc: '45L, 65L and 95L compact mini refrigerators with low power consumption — perfect for offices and hotel rooms.',
    img: 'mf2.avif'
  },

  p14: {
    name: 'Wine Coolers',
    specs: 'Temperature Control • Premium Finish',
    desc: '20, 40 and 80 bottle wine coolers with dual-zone cooling and UV-protected glass — made for wine lovers.',
    img: 'wc2.avif'
  },

  /* ───────────── AIR CONDITIONERS ───────────── */

  p15: {
    name: 'Split Air Conditioners',
    specs: 'Inverter • Wide Airflow',
    desc: '1.5 ton, 2 ton and hot & cold split ACs with inverter compressor and turbo cooling — suitable for medium to large rooms.',
    img: 'ac2.jpg'
  },

  p16: {
    name: 'Tower Air Conditioners',
    specs: 'High Capacity • Powerful Cooling',
    desc: '1.5 ton and 2 ton tower ACs with high air throw and digital controls — ideal for halls and offices.',
    img: 'tower1.png'
  },

  p17: {
    name: 'Air Coolers',
    specs: 'High Air Delivery • Energy Efficient',
    desc: 'Personal, desert and smart air coolers with large tanks and remote control — best for dry climate regions.',
    img: 'cooler1.png'
  },

  /* ───────────── WASHING & LAUNDRY ───────────── */

  p18: {
    name: 'Washer',
    specs: 'Washer Only • Low Power Consumption',
    desc: '6 kg and 9 kg washer-only units with low water usage and heavy-duty motor — ideal for budget users.',
    img: 'wash2.png'
  },

  p19: {
    name: 'Semi Automatic Washing Machines',
    specs: 'Twin Tub • Durable',
    desc: '6.5 kg, 8 kg and 12 kg semi-automatic washing machines — perfect for budget households.',
    img: 'sm2.avif'
  },

  p20: {
    name: 'Top Load Washing Machines',
    specs: 'Fully Automatic • Smart Wash',
    desc: '7 kg, 8 kg and 10 kg fully automatic top-load washing machines — suitable for small to medium families.',
    img: 'tl2.avif'
  },

  p21: {
    name: 'Front Load Washing Machines',
    specs: 'Inverter Motor • Premium Wash Care',
    desc: '7 kg, 9 kg and 12 kg front-load washing machines with steam wash and smart control — designed for premium homes.',
    img: 'fl2.avif'
  },

  /* ───────────── KITCHEN & HOME ───────────── */

  p22: {
    name: 'Cook Top',
    specs: 'Gas / Electric / Induction • Auto Ignition • Toughened Glass Top • Brass Burners • Heat Resistant Knobs • Easy Spill Cleaning • Anti-Skid Feet',
    img: 'cook2.png'
  },

  p23: {
    name: 'Mixer Grinder',
    specs: '500–750 W • 2–4 Jar Options • Stainless Steel Blades • Overload Protection • High Torque Motor • Shock Proof Body • Low Noise Operation',
    img: 'mix2.png'
  },

  p24: {
    name: 'Air Fryer',
    specs: '4 L Capacity • 1500 W Power • Oil-Free Cooking • Rapid Air Technology • Adjustable Temperature (80–200°C) • Timer Control • Non-Stick Basket',
    img: 'air2.png'
  },

  p25: {
    name: 'Convection Microwave Oven',
    specs: '700–1200 W • 20–32 L Capacity • Solo / Grill / Convection • Auto Cook Menus • Child Lock • Defrost by Weight • Touch Control Panel',
    img: 'mic2.png'
  },

  p26: {
    name: 'Rice Cooker',
    specs: '1–2 L Capacity • Automatic Cooking • Keep Warm Mode • Non-Stick Inner Pot • Cool Touch Handles • Steam Vent • Energy Efficient',
    img: 'cok.png'
  },

  p27: {
    name: 'Electric Kettle',
    specs: '1–1.7 L Capacity • 1500–2000 W • Fast Boil • Auto Shut-Off • Boil Dry Protection • Concealed Heating Element • Stainless Steel Body',
    img: 'elec2.avif'
  },
   p28: {
    name: 'Grill Microwave Ovens',
    specs: '800–1200 W • Grill + Microwave • Crispy Grilling • Quartz / Sheath Grill • Auto Cook Menus • Defrost by Weight • Child Lock • Touch Control Panel',
    img: 'gril2.png'
  },

  p29: {
    name: 'Solo Microwave Ovens',
    specs: '700–1000 W • Reheat & Defrost • Uniform Heating • Auto Cook Programs • Easy Mechanical / Touch Controls • Compact Design • Energy Efficient',
    img: 'solo2.png'
  },
   p30: {
    name: 'Water Purifiers',
    specs: 'RO • UV • UF • TDS Controller • 7–10 L Storage',
    desc: `
Available Variants:

• RO + UV + UF Water Purifier  
  – Multi-stage purification  
  – Suitable for borewell & tanker water  

• RO Water Purifier with TDS Control  
  – Retains essential minerals  
  – High purification capacity  

• UV + UF Water Purifier  
  – Ideal for municipal water  
  – Low maintenance  

Best for: Homes, Apartments
    `,
    img: 'wp2.png'
  },

  p31: {
    name: 'Water Dispensers',
    specs: 'Hot & Cold • Compressor Cooling • Bottle / Bottle-less',
    desc: `
Available Variants:

• Hot & Cold Water Dispenser  
  – Compressor cooling  
  – Child safety lock  

• Normal + Cold Water Dispenser  
  – Energy efficient  
  – Compact design  

• Bottle-less Water Dispenser  
  – Direct water connection  
  – In-built filtration  

Best for: Offices, Shops, Homes
    `,
    img: 'wd2.png'
  },
  p34: {
  name: 'Wet Grinders',
  specs: '2–5 L • Stone Grinding • Heavy Duty Motor',
  desc: `
Available Variants:

• 2 L Table Top Wet Grinder  
  – Compact size  
  – Low power consumption  

• 3 L Wet Grinder  
  – High torque motor  
  – Stainless steel drum  

• 5 L Commercial Wet Grinder  
  – Continuous grinding  
  – Heavy duty stone rollers  

Features:
– Traditional stone grinding  
– Uniform batter consistency  
– Overload protection  
– Easy tilt & clean design  

Best for: Idli, Dosa, Vada, Home & Commercial use
  `,
  img: 'wet2.png'
},
 p32: {
  name: 'Rice Cookers',
  specs: '1–2 L • Auto Cook • Keep Warm',
  desc: `
Available Variants:

• 1 L Rice Cooker  
  – Compact design  
  – Ideal for bachelors  

• 1.8 L Rice Cooker  
  – Family size  
  – Automatic cooking  

• Electric Rice Cooker  
  – Steaming & boiling  
  – One-touch operation  

Features:
– Non-stick inner pot  
– Automatic keep warm mode  
– Cool-touch handles  
– Energy efficient heating  

Best for: Daily rice cooking, Small families
  `,
  img: 'cok2.png'
},

p33: {
  name: 'Electric Kettles',
  specs: '1–1.7 L • 1500–2000 W • Fast Boil',
  desc: `
Available Variants:

• 1 L Electric Kettle  
  – Stainless steel body  
  – Fast boiling  

• 1.5 L Electric Kettle  
  – Auto shut-off  
  – Boil dry protection  

• Glass Electric Kettle  
  – LED illumination  
  – Premium design  

Features:
– Concealed heating element  
– Cordless 360° base  
– Overheat protection  
– Easy lid opening  

Best for: Tea, coffee, instant foods
  `,
  img: 'elec2.avif'
},
p35: {
  name: 'Geysers (Water Heaters)',
  specs: '10–25 L • Instant / Storage • Energy Efficient',
  desc: `
Available Variants:

• Instant Geyser  
  – Fast heating  
  – Compact wall mount  

• 10 L Storage Geyser  
  – Ideal for small families  
  – Temperature control  

• 15–25 L Storage Geyser  
  – High pressure compatible  
  – Suitable for multiple bathrooms  

Features:
– Copper / Glass-lined heating element  
– Rust & corrosion resistant tank  
– Thermal cut-off safety  
– Energy efficient insulation  

Best for: Bathrooms, Kitchens
  `,
  img: 'gy2.jpg'
},

p36: {
  name: 'Room Heaters',
  specs: '1000–2000 W • Fan / Oil Filled • Fast Heating',
  desc: `
Available Variants:

• Fan Room Heater  
  – Instant heat  
  – Lightweight & portable  

• Quartz Heater  
  – Silent operation  
  – Directional heating  

• Oil Filled Radiator  
  – Long-lasting warmth  
  – Thermostat control  

Features:
– Adjustable heat settings  
– Tip-over safety switch  
– Overheat protection  
– Low noise operation  

Best for: Bedrooms, Living rooms, Winters
  `,
  img: 'heater2.png'
},
p37: {
  name: 'Iron Boxes',
  specs: 'Dry / Steam • Non-Stick Soleplate • Fast Heating',
  desc: `
Available Variants:

• Dry Iron  
  – Lightweight design  
  – Quick heat-up  

• Steam Iron  
  – Continuous steam  
  – Water spray function  

• Heavy Duty Iron  
  – High wattage heating  
  – Durable soleplate  

Features:
– Non-stick / Ceramic soleplate  
– Adjustable temperature control  
– Overheat safety protection  
– Ergonomic handle  

Best for: Daily garment care, Home use
  `,
  img: 'iron2.jpg'
},
p38: {
  name: 'Table Fans',
  specs: 'High Speed • Compact • Energy Efficient',
  desc: `
Available Variants:

• Standard Table Fan  
  – 3-speed control  
  – Aerodynamic blades  

• Rechargeable Table Fan  
  – Battery backup  
  – Portable design  

Features:
– Low noise operation  
– Adjustable tilt  
– Strong air delivery  

Best for: Study rooms, Kitchens, Personal use
  `,
  img: 'tf2.png'
},

p39: {
  name: 'Pedestal Fans',
  specs: 'Height Adjustable • Wide Air Throw',
  desc: `
Available Variants:

• Standard Pedestal Fan  
  – Adjustable height  
  – Powerful motor  

• Remote Control Pedestal Fan  
  – Timer function  
  – Silent operation  

Features:
– Oscillation control  
– Sturdy base  
– High air delivery  

Best for: Living rooms, Large bedrooms
  `,
  img: 'pf2.png'
},

p40: {
  name: 'Wall Fans',
  specs: 'Oscillating • Space Saving • High Speed',
  desc: `
Available Variants:

• Manual Wall Fan  
  – Wide angle airflow  

• Remote Control Wall Fan  
  – Timer & speed modes  

Features:
– Strong metal blades  
– Smooth oscillation  
– Easy wall mounting  

Best for: Shops, Offices, Kitchens
  `,
  img: 'wf2.png'
},

p41: {
  name: 'Ceiling Fans',
  specs: 'BLDC / Standard • Energy Efficient',
  desc: `
Available Variants:

• Standard Ceiling Fan  
  – High air delivery  
  – Durable motor  

• BLDC Ceiling Fan  
  – 60% power saving  
  – Remote control  

Features:
– Anti-dust blades  
– Silent operation  
– Long-lasting performance  

Best for: Bedrooms, Living rooms
  `,
  img: 'cf2.png'
},
p42: {
  name: 'Instant Geysers',
  specs: '1–3 L • Fast Heating • Energy Efficient',
  desc: `
Available Variants:

• 1 L Instant Geyser  
  – Ultra fast heating  
  – Compact wall mount  

• 3 L Instant Geyser  
  – High pressure compatible  
  – Copper / Glass-lined tank  

Features:
– Instant hot water in seconds  
– Thermostat & thermal cut-off  
– Rust-proof outer body  
– Low power consumption  

Safety:
– Overheat protection  
– Pressure relief valve  

Best for: Kitchens, Small bathrooms, Offices
  `,
  img: 'instant2.png'
}
,p43: {
  name: 'Dry Iron',
  specs: '750–1000 W • Lightweight • Easy Glide',
  desc: `
Available Variants:

• 750 W Dry Iron  
  – Compact & lightweight  
  – Ideal for daily use  

• 1000 W Dry Iron  
  – Faster heating  
  – Better crease removal  

Features:
– Non-stick soleplate  
– Adjustable temperature control  
– Ergonomic handle  
– 360° swivel cord  

Safety:
– Thermal fuse protection  
– Heat-resistant body  

Best for: Home use, Daily ironing
  `,
  img: 'dry2.png'
},
};

  // Modal elements (guarded)
  const modal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSpecs = document.getElementById('modal-specs');
  const modalDesc = document.getElementById('modal-desc');
  const modalImage = document.getElementById('modal-image');

  function openModal(id) {
    if (!modal) return;
    const p = products[id];
    if (!p) return;
    modalTitle.textContent = p.name;
    modalSpecs.textContent = p.specs;
    modalDesc.textContent = p.desc;
    modalImage.src = p.img;
    modalImage.alt = p.name;
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-close')?.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Wire view buttons and clickable cards
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      openModal(id);
    });
  });

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const id = card.getAttribute('data-id');
        openModal(id);
        e.preventDefault();
      }
    });
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const id = card.getAttribute('data-id');
      openModal(id);
    });
  });

  if (modal) {
    modal.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', () => closeModal());
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
      }
    });
  }

});