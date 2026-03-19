export type StoryCategory =
  | 'legends'
  | 'architecture'
  | 'corners'
  | 'history';

export type StoryItem = {
  id: string;
  category: StoryCategory;
  title: string;
  content: string;
};

export const storyData: StoryItem[] = [
  {
    id: 'legends-1',
    category: 'legends',
    title: 'The Ghost of the Seven Chimneys',
    content: `In the heart of Madrid stands a mysterious building known as Casa de las Siete Chimeneas, or the House of the Seven Chimneys. Built in the 16th century, the building has long been surrounded by stories of tragedy and restless spirits.

According to legend, the house once belonged to a young woman named Elena, the wife of a Spanish soldier who disappeared during a military campaign. After receiving the devastating news of her husband's death, Elena was said to have died suddenly under mysterious circumstances. Some believed grief took her life, while others whispered that something darker had happened behind the walls of the house.

Soon after her death, people began reporting strange sightings. On quiet nights, a pale figure dressed in white was seen standing on the roof among the seven chimneys, raising her arms toward the sky as if mourning someone lost forever.

Locals believed it was Elena’s spirit, still searching for her husband and unable to leave the place where her life ended. Even centuries later, the building continues to carry this eerie reputation, making it one of Madrid’s most famous haunted locations.`,
  },
  {
    id: 'legends-2',
    category: 'legends',
    title: 'The Whispering Palace of Linares',
    content: `Palacio de Linares, located near Plaza de Cibeles, is one of Madrid’s most elegant palaces. But beneath its luxurious appearance lies one of the city’s most unsettling legends.

The palace was built in the late 19th century for the wealthy Marquis and Marchioness of Linares. According to a persistent rumor, the couple discovered after their marriage that they were actually half-siblings, a secret hidden by their families.

The story claims they had a daughter, but fearing scandal and social ruin, they hid the child and ultimately ordered her disappearance. After this tragedy, strange phenomena allegedly began inside the palace.

During restoration work in the 20th century, some workers claimed they heard the voice of a child echoing through the empty halls. Others reported footsteps, whispers, and unexplained sounds during the night.

Whether truth or myth, the legend has transformed Palacio de Linares into one of the most mysterious buildings in Madrid.`,
  },
  {
    id: 'legends-3',
    category: 'legends',
    title: 'The Secret Tunnels of Plaza Mayor',
    content: `Beneath the famous Plaza Mayor lies a hidden network of tunnels that few visitors ever hear about. These underground passages date back centuries and were originally built for practical and political reasons.

Some tunnels were used to move prisoners from the royal prison to nearby courts without exposing them to the public. Others allowed nobles and officials to travel discreetly between important buildings.

Over time, rumors began to spread that the tunnels were also used during times of conflict, allowing secret escapes or hidden meetings away from the crowded streets.

Although most of these passages are now sealed or forgotten, historians believe that parts of this underground labyrinth may still exist beneath the historic square, silently preserving secrets of Madrid’s past.`,
  },
  {
    id: 'legends-4',
    category: 'legends',
    title: 'The Curse of the House on Calle del Codo',
    content: `Calle del Codo, one of the narrowest and most unusual streets in Madrid, is known not only for its sharp bend but also for an old local legend.

Centuries ago, a wealthy merchant lived in a small house along this street. According to the story, he was known for his greed and harsh treatment of the poor who lived nearby.

One winter evening, an elderly traveler knocked on his door asking for shelter from the cold. The merchant refused and forced the man away into the freezing night.

The next morning, the traveler was found dead near the street. Soon after, strange misfortunes began to plague the merchant’s household. His business collapsed, his wealth vanished, and he eventually disappeared from Madrid.

Locals began to whisper that the house had been cursed for its cruelty, and the story of Calle del Codo became one of the darker legends of old Madrid.`,
  },
  {
    id: 'legends-5',
    category: 'legends',
    title: 'The Disappearing Convent Treasure',
    content: `The Convento de las Descalzas Reales is one of the most beautiful religious buildings in Madrid, but it also holds a story of hidden treasures.

During times of war and political unrest, convents across Spain were known to hide valuable religious artifacts to protect them from looting. According to legend, the nuns of this convent concealed a collection of jewels, paintings, and sacred objects somewhere within the building’s hidden chambers.

However, when authorities later searched the convent, no trace of the treasure was ever found.

Some believe the nuns secretly moved the valuables through underground routes to another safe location. Others claim the treasure still lies hidden behind sealed walls inside the convent.

The mystery has never been solved.`,
  },
  {
    id: 'legends-6',
    category: 'legends',
    title: 'The Forgotten Garden of Anglona',
    content: `Hidden among the old streets of La Latina lies Jardín del Príncipe de Anglona, a quiet garden surrounded by historic buildings.

Few visitors realize that this peaceful place once belonged to a noble palace. In the 18th century, the garden served as a private retreat for aristocrats who wished to escape the noise of the growing city.

Over time the palace disappeared, but the garden remained. Locals say that if you visit early in the morning, when the garden is empty and silent, you can almost imagine the footsteps of nobles walking along the old stone paths.

The garden is a reminder that even in the center of a modern city, fragments of Madrid’s past still quietly survive.`,
  },
  {
    id: 'legends-7',
    category: 'legends',
    title: 'The Arch of the Knife Makers',
    content: `The dramatic stone staircase beneath Arco de Cuchilleros leads down from Plaza Mayor into a narrow street filled with restaurants and taverns.

In the Middle Ages, this area was home to craftsmen who produced knives and tools for the city markets. Their workshops filled the streets with the sound of hammering metal and the glow of furnaces late into the night.

According to local stories, the archway became a gathering place for workers after long days of labor. Some legends even suggest that secret meetings were held here, far from the watchful eyes of city officials.

Today the arch still stands, connecting modern Madrid with the hidden stories of the craftsmen who once shaped the city’s daily life.`,
  },
  {
    id: 'legends-8',
    category: 'legends',
    title: 'The Balcony That Watched the City',
    content: `Many buildings in Madrid feature beautiful wrought-iron balconies overlooking narrow streets. These balconies were not just decorative—they were once an important part of city life.

In earlier centuries, balconies allowed residents to watch processions, festivals, and public events taking place in the streets below. Wealthy families often rented out their balconies during major celebrations so others could enjoy the best views of the festivities.

Some balconies became famous observation points during royal visits, religious parades, or dramatic moments in the city’s history.

Even today, when walking through the historic districts of Madrid, these balconies quietly remind visitors of the centuries of life and celebration that once unfolded beneath them.`,
  },
  {
    id: 'architecture-1',
    category: 'architecture',
    title: 'The Story Behind Madrid’s Hidden Courtyards',
    content: `Many buildings in Madrid hide beautiful inner courtyards known as patios, but most visitors walk past them without noticing. These courtyards were not only decorative spaces — they played an important role in daily life.

In earlier centuries, Madrid’s narrow streets and dense neighborhoods made natural light and ventilation difficult inside buildings. The solution was to build homes around a central open courtyard. This design allowed sunlight and fresh air to reach every apartment and created a shared communal space for residents.

Patios also became social centers of the building. Families gathered there in the evenings, children played under the balconies, and neighbors shared daily conversations. In summer, the shaded courtyard offered relief from the intense Spanish heat.

Today many of these courtyards remain hidden behind simple doorways, quietly preserving the architectural traditions that shaped the historic neighborhoods of Madrid.`,
  },
  {
    id: 'architecture-2',
    category: 'architecture',
    title: 'The Language of Madrid’s Balconies',
    content: `One of the most recognizable features of Madrid’s historic streets is the elegant wrought-iron balcony. At first glance they seem purely decorative, but they were designed with several practical purposes in mind.

Balconies allowed residents to observe street life from above. In earlier centuries the streets were the center of public events, religious processions, and celebrations. From their balconies, families could watch the city come alive without leaving their homes.

Balconies also helped regulate temperature. By opening balcony doors, residents allowed cool evening air to circulate through the rooms, which was essential before modern climate control.

Over time these balconies became artistic elements as well. Craftsmen created intricate iron patterns that added personality to each building, making Madrid’s streets visually rich and unique.`,
  },
  {
    id: 'architecture-3',
    category: 'architecture',
    title: 'The Curved Corners of Old Madrid',
    content: `Walking through the historic center, observant visitors may notice that many buildings have rounded or angled corners where two streets meet. This was not only a stylistic choice but also a practical architectural solution.

In earlier centuries Madrid’s streets were narrow and often crowded with carts, horses, and pedestrians. Sharp corners made it difficult for carriages to turn safely. By softening the edges of buildings, architects created smoother passageways for traffic.

These curved corners also improved visibility at intersections, helping prevent accidents in tight spaces.

Today these subtle architectural details are easy to overlook, but they reveal how city design adapted to the daily movement of people and vehicles long before modern urban planning existed.`,
  },
  {
    id: 'architecture-4',
    category: 'architecture',
    title: 'The Hidden Symbols Above Doorways',
    content: `If you look carefully above many old doorways in Madrid, you may notice carved symbols, coats of arms, or small decorative plaques. These details often tell stories about the building’s original owners.

During the Renaissance and Baroque periods, wealthy families placed their family crests above entrances to show status and identity. These emblems served as both decoration and a public statement of lineage and prestige.

Some buildings also display religious symbols meant to protect the household from misfortune. Small crosses, saints, or sacred initials were sometimes carved into stone above the entrance.

Although many of these details have faded over time, they remain quiet reminders of the people who once lived behind the walls of Madrid’s historic homes.`,
  },
  {
    id: 'architecture-5',
    category: 'architecture',
    title: 'The Corrala Houses of Madrid',
    content: `Among the most distinctive residential buildings in Madrid are the corralas, a type of communal housing developed between the 17th and 19th centuries.

These buildings were designed around a central courtyard surrounded by wooden or metal balconies that connected the apartments. Each family lived in a small room facing the courtyard, while shared staircases and galleries created a close-knit community environment.

The courtyard served as the heart of daily life. Residents gathered there to talk, cook, wash clothes, and celebrate small neighborhood events.

Although many corralas have disappeared over time, a few still remain in districts such as Lavapiés and La Latina. They offer a fascinating glimpse into the social and architectural history of Madrid’s working-class neighborhoods.`,
  },
  {
    id: 'corners-1',
    category: 'corners',
    title: 'The Quiet Garden of Anglona',
    content: `Hidden behind the historic buildings of La Latina lies a small green space known as Jardín del Príncipe de Anglona. Many visitors walk through the nearby streets without ever noticing that a peaceful garden sits just behind the stone walls.

The garden dates back to the 18th century and once belonged to the palace of the Prince of Anglona. Unlike large public parks in Madrid, this garden was designed as a private retreat. Aristocrats came here to escape the noise of the city, walking along quiet paths surrounded by carefully arranged plants and stone terraces.

Over time the palace itself disappeared, but the garden remained almost untouched. Today it still preserves its original layout, making it one of the rare historic gardens in Madrid that has survived centuries of urban change.

Stepping inside feels like entering a hidden pocket of calm within the busy historic center.`,
  },
  {
    id: 'corners-2',
    category: 'corners',
    title: 'The Hidden Square of Conde de Barajas',
    content: `Just a few steps away from the crowded streets near Plaza Mayor lies Plaza del Conde de Barajas, a small square that many travelers never discover.

Unlike the grand plazas of Madrid, this square has a quieter and more intimate character. Tall historic buildings surround the open space, while trees and benches create a peaceful atmosphere away from the main tourist routes.

Centuries ago, this area was part of a residential district where noble families lived close to the royal court. Over time the neighborhood changed, but the square preserved its relaxed charm.

Today it remains a favorite hidden corner for locals who want to enjoy a calm moment in the heart of the old city.`,
  },
  {
    id: 'corners-3',
    category: 'corners',
    title: 'The Passage Behind San Ginés',
    content: `Near the famous Chocolatería San Ginés, known for its traditional churros, there is a narrow passage that many people pass through without realizing its historical significance.

The small corridor known as Pasadizo de San Ginés has existed for centuries and once connected several important streets of the medieval city. In earlier times these passages allowed residents to move quickly between neighborhoods while avoiding crowded markets and main roads.

The surrounding buildings still reflect the architectural style of old Madrid, with balconies, stone façades, and small windows overlooking the narrow street.

Walking through the passage today offers a brief but authentic glimpse into the compact urban layout of historic Madrid.`,
  },
  {
    id: 'corners-4',
    category: 'corners',
    title: 'The Steps of Arco de Cuchilleros',
    content: `One of the most dramatic hidden entrances to Plaza Mayor is found beneath the historic Arco de Cuchilleros. The steep stone staircase leads from the lower street level up into the grand square above.

The name “Cuchilleros,” meaning knife makers, comes from the craftsmen who once worked in this area. During the Middle Ages the surrounding streets were filled with small workshops where artisans produced tools and metal goods for the city markets.

The arch and staircase created a practical connection between different levels of the neighborhood, but over time the location also gained a mysterious charm.

Even today, walking up the steps feels like entering the historic heart of Madrid through a hidden gateway.`,
  },
  {
    id: 'corners-5',
    category: 'corners',
    title: 'The Courtyard of San Isidro',
    content: `Inside the Museo de San Isidro, which tells the story of Madrid’s early history, lies a quiet courtyard that many visitors overlook.

The patio preserves the traditional architectural style of old Madrid houses, with simple stone walls, shaded arcades, and open sky above. In the past, spaces like this served as the central gathering place for families and neighbors.

Although the museum focuses on archaeology and history, the courtyard itself is a living example of how architecture shaped daily life in the city.

It offers a quiet pause in the middle of a cultural visit and reflects the simple elegance of Madrid’s historic homes.`,
  },
  {
    id: 'corners-6',
    category: 'corners',
    title: 'The Forgotten Streets of La Latina',
    content: `The district of La Latina is famous for its lively restaurants and tapas bars, but hidden between its busy streets are small lanes that still preserve the atmosphere of medieval Madrid.

These narrow streets were originally designed during the Middle Ages when the city grew inside defensive walls. The irregular layout, small squares, and winding alleys reflect the organic development of the neighborhood over centuries.

Some corners feel almost untouched by time. Old balconies lean over the streets, lanterns cast warm light on the stone walls, and small doorways lead to hidden courtyards behind the buildings.

Exploring these quiet lanes reveals a side of Madrid that feels far removed from the modern city.`,
  },
  {
    id: 'corners-7',
    category: 'corners',
    title: 'The Terrace of Las Vistillas',
    content: `Tucked away near the historic center, Jardines de las Vistillas is a small garden terrace that offers one of the most beautiful views of Madrid.

The gardens are built on a slight hill overlooking parts of the city, and from here visitors can see rooftops, towers, and distant neighborhoods stretching across the horizon.

Despite the view, the gardens remain relatively quiet compared to larger parks like El Retiro. Locals often come here in the evening to enjoy the sunset or relax away from the crowds.

This peaceful terrace shows how even in the center of a busy capital city, hidden viewpoints still exist.`,
  },
  {
    id: 'corners-8',
    category: 'corners',
    title: 'The Secret Corners of Plaza de la Villa',
    content: `Plaza de la Villa is one of the oldest squares in Madrid and was once the center of city administration. While the square itself is known to many visitors, its surrounding corners hide fascinating architectural details.

Narrow passages lead away from the square into small streets lined with historic buildings. Stone façades, wooden balconies, and old lanterns give the area a distinctly medieval character.

In earlier centuries city officials, merchants, and residents all gathered here as Madrid slowly grew from a small town into a royal capital.

Today the square and its surrounding streets remain one of the best places to experience the historic atmosphere of old Madrid.`,
  },
  {
    id: 'history-1',
    category: 'history',
    title: 'Madrid Began as a Fortress',
    content: `Madrid’s origins date back to the 9th century, when the city was founded as a small fortress by the Muslim ruler Muhammad I of Córdoba. The settlement was called Mayrit, which likely meant “place of water” because of the underground streams that flowed through the area. The fortress protected important trade routes and guarded the surrounding territory.

Although little remains of the original structure today, parts of the old defensive walls can still be seen near the Royal Palace.`,
  },
  {
    id: 'history-2',
    category: 'history',
    title: 'A Small Town Became Spain’s Capital',
    content: `For centuries Madrid was only a modest town. Everything changed in 1561, when King Philip II decided to move the royal court from Toledo to Madrid.

The decision transformed the city almost overnight. Nobles, merchants, artists, and workers all moved to Madrid, and the population grew rapidly. Palaces, churches, and new neighborhoods began to appear, turning the once small settlement into the political center of Spain.`,
  },
  {
    id: 'history-3',
    category: 'history',
    title: 'Plaza Mayor Was Once a Market Square',
    content: `One of Madrid’s most famous landmarks, Plaza Mayor, was originally designed as a large marketplace during the early 17th century.

The square hosted markets, festivals, bullfights, and even public ceremonies organized by the royal court. It was the central stage of Madrid’s public life for hundreds of years.

Despite several fires that damaged the square in the past, it was rebuilt each time, preserving its iconic architectural style.`,
  },
  {
    id: 'history-4',
    category: 'history',
    title: 'Madrid Grew Without a River',
    content: `Unlike many European capitals, Madrid was not built along a large river. The nearby Manzanares River is relatively small and was never suitable for large trade routes.

Instead of growing as a trading port, Madrid developed primarily as a political and royal city, centered around the court and government institutions.

This unusual origin explains why many of Madrid’s historic buildings are palaces, administrative buildings, and noble residences.`,
  },
  {
    id: 'history-5',
    category: 'history',
    title: 'The Royal Palace Stands on a Medieval Fortress',
    content: `The impressive Royal Palace of Madrid sits on the site of the original Moorish fortress that once protected the city.

After a fire destroyed the earlier royal residence in the 18th century, a grand new palace was constructed. Today it is one of the largest royal palaces in Europe, with more than 3,000 rooms.

Although the Spanish royal family no longer lives there permanently, the palace remains an important ceremonial symbol of Spain’s monarchy.`,
  },
  {
    id: 'history-6',
    category: 'history',
    title: 'Madrid’s Streets Were Once Narrow and Unplanned',
    content: `Much of Madrid’s historic center developed organically over centuries without strict urban planning. As a result, many streets in older districts such as La Latina and Lavapiés are narrow, winding, and irregular.

This layout reflects the medieval origins of the city, when buildings were constructed gradually around small paths and markets rather than according to a formal plan.

Today these streets create the charming maze-like atmosphere that characterizes old Madrid.`,
  },
  {
    id: 'history-7',
    category: 'history',
    title: 'The City Survived Several Major Fires',
    content: `Throughout its history Madrid has experienced several large fires that destroyed important buildings and parts of the city.

One of the most significant fires occurred in 1734, when the original Royal Alcázar palace burned down. The disaster led to the construction of the modern Royal Palace that stands today.

Fires also affected Plaza Mayor multiple times, but each reconstruction preserved the traditional appearance of the square.`,
  },
  {
    id: 'history-8',
    category: 'history',
    title: 'The Rise of Gran Vía',
    content: `At the beginning of the 20th century, Madrid underwent a major transformation with the construction of Gran Vía, one of the city’s most famous avenues.

The project required demolishing hundreds of old buildings to create a wide boulevard connecting different parts of the city center. The new street quickly became a symbol of modern Madrid, filled with theaters, cinemas, hotels, and elegant architecture.

Gran Vía remains one of the most vibrant streets in the city today.`,
  },
  {
    id: 'history-9',
    category: 'history',
    title: 'Madrid Became a Cultural Capital',
    content: `During the 19th and 20th centuries, Madrid developed into one of Europe’s important cultural centers. Museums, theaters, and universities expanded throughout the city.

Institutions such as the Prado Museum, the Reina Sofía Museum, and the Thyssen-Bornemisza Museum helped establish Madrid as a global destination for art and culture.

This transformation turned the city into a place where historic architecture and modern creativity exist side by side.`,
  },
  {
    id: 'history-10',
    category: 'history',
    title: 'A City That Continues to Evolve',
    content: `Although Madrid has centuries of history, it remains a dynamic and constantly changing city. Historic neighborhoods coexist with modern architecture, and old courtyards sit quietly beside contemporary buildings.

Today Madrid continues to grow as a cultural, political, and creative center of Spain, while still preserving the historic streets, squares, and hidden corners that tell the story of its past.`,
  },
];