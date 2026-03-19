export type PlaceCategory =
  | 'royal'
  | 'historic'
  | 'passage'
  | 'quiet';

export type PlaceItem = {
  id: string;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  category: PlaceCategory;
  image: any;
};

export const placesData: PlaceItem[] = [
  {
    id: '1',
    title: 'Palacio de Linares',
    description:
      'This magnificent 19th-century palace stands beside Plaza de Cibeles and is one of the most elegant historic buildings in Madrid. Behind its richly decorated façade lies a refined inner courtyard surrounded by classical architecture, marble staircases, and ornate balconies. The atmosphere inside is calm and almost theatrical, reflecting the aristocratic lifestyle of Madrid’s elite during the late 1800s. Today the palace hosts cultural events and exhibitions, making it a fascinating place where history, architecture, and legend meet.',
    address: 'Plaza de Cibeles 2, 28014 Madrid, Spain',
    latitude: 40.4190,
    longitude: -3.6934,
    category: 'royal',
    image: require('../assets/places/palacio_linares.png'),
  },
  {
    id: '2',
    title: 'Museo Cerralbo Palace Courtyard',
    description:
      'Museo Cerralbo was once the private residence of the Marquis of Cerralbo. The palace preserves the atmosphere of a noble Madrid home from the late 19th century. Its elegant courtyard reflects European aristocratic taste, with symmetrical architecture, decorative columns, and a peaceful interior atmosphere hidden from the busy streets outside. Walking through the palace and its courtyard offers visitors a glimpse into the refined lifestyle of Madrid’s historical nobility.',
    address: 'Calle de Ventura Rodríguez 17, 28008 Madrid, Spain',
    latitude: 40.4230,
    longitude: -3.7174,
    category: 'royal',
    image: require('../assets/places/museo_cerralbo.png'),
  },
  {
    id: '3',
    title: 'Palacio de Santa Cruz Courtyard',
    description:
      'This impressive red-brick palace dates back to the 17th century and once served as the royal prison of Madrid. The building’s central courtyard is one of its most beautiful architectural features, framed by arches and balanced proportions typical of Spanish Baroque architecture. Today the palace houses the Spanish Ministry of Foreign Affairs, but its historic courtyard remains a striking reminder of Madrid’s political and architectural history.',
    address: 'Plaza de la Provincia 1, 28012 Madrid, Spain',
    latitude: 40.4146,
    longitude: -3.7065,
    category: 'royal',
    image: require('../assets/places/palacio_santa_cruz.png'),
  },
  {
    id: '4',
    title: 'Palacio de Longoria Interior Patio',
    description:
      'Palacio de Longoria is one of the most distinctive buildings in Madrid thanks to its unique Art Nouveau design. Built in the early 20th century, the palace features flowing architectural forms, decorative façades, and beautifully crafted interior spaces. The interior patio and central areas are especially striking, reflecting the artistic ambition of the modernist movement. Today the building houses Spain’s Society of Authors and Composers and remains an architectural gem in the city.',
    address: 'Calle de Fernando VI 4, 28004 Madrid, Spain',
    latitude: 40.4239,
    longitude: -3.6977,
    category: 'royal',
    image: require('../assets/places/palacio_longoria.png'),
  },
  {
    id: '5',
    title: 'Palacio de Buenavista Courtyard',
    description:
      'Located near Plaza de Cibeles, Palacio de Buenavista is a historic palace surrounded by gardens and inner courtyards. Originally built in the 18th century, it has served as a royal residence and later as a military headquarters. Although the palace itself is not always open to the public, its architecture and hidden courtyards represent the refined urban design of Madrid’s aristocratic past.',
    address: 'Calle de Alcalá 51, 28014 Madrid, Spain',
    latitude: 40.4209,
    longitude: -3.6949,
    category: 'royal',
    image: require('../assets/places/palacio_buenavista.png'),
  },
  {
    id: '6',
    title: 'Palacio de Liria Courtyard',
    description:
      'Palacio de Liria is one of the grandest private palaces in Madrid and the official residence of the House of Alba. Built in the 18th century, the palace combines neoclassical architecture with impressive interior gardens and courtyards. These quiet spaces contrast beautifully with the monumental architecture of the palace and create an elegant environment that reflects centuries of Spanish noble heritage.',
    address: 'Calle de la Princesa 20, 28008 Madrid, Spain',
    latitude: 40.4260,
    longitude: -3.7137,
    category: 'royal',
    image: require('../assets/places/palacio_liria.png'),
  },
  {
    id: '7',
    title: 'Casa de Cisneros Patio',
    description:
      'Casa de Cisneros is a historic building located on the beautiful Plaza de la Villa. Built in the 16th century, the house features traditional Spanish architectural elements and a charming inner courtyard surrounded by stone arches. The patio reflects the medieval character of old Madrid and remains one of the quiet historic corners in the city’s historic center.',
    address: 'Plaza de la Villa 4, 28005 Madrid, Spain',
    latitude: 40.4154,
    longitude: -3.7110,
    category: 'historic',
    image: require('../assets/places/casa_cisneros.png'),
  },
  {
    id: '8',
    title: 'Casa de las Siete Chimeneas Patio',
    description:
      'This historic building from the 16th century is famous for its mysterious past and unusual roof with seven chimneys. According to legend, the spirit of a woman once appeared on the rooftop at night. The building also hides an inner courtyard that reflects the classic design of Madrid houses from the Renaissance period. Today it serves as a cultural institution while preserving its historical character.',
    address: 'Plaza del Rey 1, 28004 Madrid, Spain',
    latitude: 40.4206,
    longitude: -3.6982,
    category: 'historic',
    image: require('../assets/places/siete_chimeneas.png'),
  },
  {
    id: '9',
    title: 'Corrala de Mesón de Paredes',
    description:
      'Corrala buildings are traditional residential structures unique to Madrid. They feature balconies that overlook a shared inner courtyard where residents once gathered. Corrala de Mesón de Paredes is a classic example of this architecture, offering a glimpse into everyday life in historic Madrid neighborhoods.',
    address: 'Calle de Mesón de Paredes 79, 28012 Madrid, Spain',
    latitude: 40.4095,
    longitude: -3.7036,
    category: 'historic',
    image: require('../assets/places/corrala_meson_paredes.png'),
  },
  {
    id: '10',
    title: 'Corrala del Sombrerete',
    description:
      'This historic residential building is one of the best-preserved corralas in Madrid. The interior courtyard is surrounded by wooden balconies that once connected apartments in a communal layout. The structure reflects the social and architectural history of Madrid’s working-class neighborhoods.',
    address: 'Calle del Sombrerete 26, 28012 Madrid, Spain',
    latitude: 40.4088,
    longitude: -3.7038,
    category: 'historic',
    image: require('../assets/places/corrala_sombrerete.png'),
  },
  {
    id: '11',
    title: 'Museo de San Isidro Courtyard',
    description:
      'The Museum of San Isidro explores the early history of Madrid. Inside the building visitors can discover a peaceful courtyard that preserves the traditional architectural style of historic Madrid houses. The patio creates a calm space within the museum and connects the modern exhibition with the city’s past.',
    address: 'Plaza de San Andrés 2, 28005 Madrid, Spain',
    latitude: 40.4135,
    longitude: -3.7089,
    category: 'historic',
    image: require('../assets/places/museo_san_isidro.png'),
  },
  {
    id: '12',
    title: 'Convento de las Descalzas Reales Patio',
    description:
      'This 16th-century convent hides beautiful inner courtyards and quiet cloisters behind its historic walls. The patios provide peaceful spaces where visitors can experience the calm atmosphere of religious life in historic Madrid. The architecture combines Renaissance elements with the serene design typical of Spanish monasteries.',
    address: 'Plaza de las Descalzas 3, 28013 Madrid, Spain',
    latitude: 40.4177,
    longitude: -3.7062,
    category: 'historic',
    image: require('../assets/places/descalzas_reales.png'),
  },
  {
    id: '13',
    title: 'Pasadizo de San Ginés',
    description:
      'This narrow historic passage is located near Plaza Mayor and connects several small streets of the old city. Walking through the passage feels like stepping into another era, surrounded by historic buildings and traditional Madrid architecture.',
    address: 'Pasadizo de San Ginés, 28013 Madrid, Spain',
    latitude: 40.4165,
    longitude: -3.7066,
    category: 'passage',
    image: require('../assets/places/san_gines.png'),
  },
  {
    id: '14',
    title: 'Pasaje de la Piedad',
    description:
      'Pasaje de la Piedad is a small passage hidden between historic buildings in central Madrid. It offers a quiet path away from busy streets and reveals architectural details typical of older Madrid neighborhoods.',
    address: 'Calle de Augusto Figueroa 17, 28004 Madrid, Spain',
    latitude: 40.4201,
    longitude: -3.7016,
    category: 'passage',
    image: require('../assets/places/pasaje_piedad.png'),
  },
  {
    id: '15',
    title: 'Pasaje de Murga',
    description:
      'This lesser-known passageway is tucked between traditional buildings in Madrid’s historic center. Its narrow path and classic architecture create an intimate atmosphere that contrasts with the surrounding urban energy.',
    address: 'Calle de Murga, 28012 Madrid, Spain',
    latitude: 40.4150,
    longitude: -3.7074,
    category: 'passage',
    image: require('../assets/places/pasaje_murga.png'),
  },
  {
    id: '16',
    title: 'Arco de Cuchilleros',
    description:
      'One of the most iconic arches in Madrid, Arco de Cuchilleros connects Plaza Mayor with a lower street level. The steep stone steps and historic walls create a dramatic entrance into one of the city’s most famous squares.',
    address: 'Calle de Cuchilleros 7, 28005 Madrid, Spain',
    latitude: 40.4156,
    longitude: -3.7077,
    category: 'passage',
    image: require('../assets/places/arco_cuchilleros.png'),
  },
  {
    id: '17',
    title: 'Pasaje del Comercio',
    description:
      'This quiet passage links nearby streets and reveals small architectural details often overlooked by visitors. It reflects the layered urban design of Madrid’s historic neighborhoods.',
    address: 'Calle Mayor 10, 28013 Madrid, Spain',
    latitude: 40.4169,
    longitude: -3.7054,
    category: 'passage',
    image: require('../assets/places/pasaje_comercio.png'),
  },
  {
    id: '18',
    title: 'Pasaje de Matheu',
    description:
      'Pasaje de Matheu is a small pedestrian corridor surrounded by traditional Madrid buildings. It provides a hidden connection between streets and offers a glimpse of the city’s historical urban layout.',
    address: 'Calle de Matheu 6, 28012 Madrid, Spain',
    latitude: 40.4174,
    longitude: -3.7058,
    category: 'passage',
    image: require('../assets/places/pasaje_matheu.png'),
  },
  {
    id: '19',
    title: 'Jardín del Príncipe de Anglona',
    description:
      'This hidden garden is one of the most peaceful places in the historic center. Surrounded by old stone walls and classic buildings, it offers a quiet escape from the busy streets of Madrid.',
    address: 'Calle del Príncipe de Anglona 1, 28005 Madrid, Spain',
    latitude: 40.4127,
    longitude: -3.7119,
    category: 'quiet',
    image: require('../assets/places/anglona_garden.png'),
  },
  {
    id: '20',
    title: 'Dalieda de San Francisco',
    description:
      'Located near the Basilica of San Francisco el Grande, this small garden offers beautiful views of the city. The peaceful atmosphere and scenic setting make it a perfect hidden corner for relaxation.',
    address: 'Carrera de San Francisco 15, 28005 Madrid, Spain',
    latitude: 40.4104,
    longitude: -3.7143,
    category: 'quiet',
    image: require('../assets/places/dalieda_san_francisco.png'),
  },
  {
    id: '21',
    title: 'Plaza de la Paja',
    description:
      'Plaza de la Paja is one of the oldest squares in Madrid. Surrounded by historic buildings and traditional restaurants, the square maintains a relaxed atmosphere that reflects the character of old Madrid.',
    address: 'Plaza de la Paja, 28005 Madrid, Spain',
    latitude: 40.4123,
    longitude: -3.7113,
    category: 'quiet',
    image: require('../assets/places/plaza_paja.png'),
  },
  {
    id: '22',
    title: 'Plaza de la Villa',
    description:
      'This historic square is surrounded by some of Madrid’s oldest buildings and provides a beautiful glimpse into the city’s medieval past. Its architecture and quiet setting make it one of the most atmospheric places in the historic center.',
    address: 'Plaza de la Villa, 28005 Madrid, Spain',
    latitude: 40.4153,
    longitude: -3.7107,
    category: 'quiet',
    image: require('../assets/places/plaza_villa.png'),
  },
  {
    id: '23',
    title: 'Plaza del Conde de Barajas',
    description:
      'This charming square sits quietly between historic streets and offers a relaxed atmosphere with trees and traditional architecture. It is one of the lesser-known but most pleasant corners of central Madrid.',
    address: 'Plaza del Conde de Barajas, 28005 Madrid, Spain',
    latitude: 40.4144,
    longitude: -3.7092,
    category: 'quiet',
    image: require('../assets/places/conde_barajas.png'),
  },
  {
    id: '24',
    title: 'Jardines de las Vistillas',
    description:
      'A peaceful garden terrace offering scenic views across parts of Madrid. The gardens are often less crowded and provide a calm place to enjoy the city’s skyline and historic surroundings.',
    address: 'Calle de las Vistillas, 28005 Madrid, Spain',
    latitude: 40.4109,
    longitude: -3.7147,
    category: 'quiet',
    image: require('../assets/places/vistillas_garden.png'),
  },
];