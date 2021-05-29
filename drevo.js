// якщо знайду зручний для парсингу сайт - прикрутимо якись скрапер

const drevos = {
  'movies' : [
    {
      'western' : ['100114', '131270', '136494', '59549'],
      'voennye' : ['131518', '222173', '100037', '136578'],
      'fantastika' : ['64237', '131251', '90324', '126893', '112372', '87192'],
      'thriller' : ['436316', '95090', '157175', '110595', '415589', '143930'],
      'comedy' : ['121535', '126950', '187138', '448902', '99917'],
      'horror' : ['202232', '186574', '459163', '417163', '217073', '208428'],
      'istoricheskie' : ['64224', '416050', '420468', '222173'],
      'boeviki' : ['97812', '126656', '132443', '133849', '74862', '64252', '218449'],
      'detective' : ['419281', '100078', '143930', '115679', '87649'],
      'adventures' : ['90324', '83344', '112372', '87192', '97246', '211366', '107444'],
      'drama' : ['222462', '105625', '95438', '121535', '417132', '222462', '208786'],
    }
  ],
  'series' : [
    {
      'boeviki' : ['dalnobojschiki', 'taras-bulba', '5_dney_do_polunochi'],
      'adventures' : ['poka-tsvetet-paporotnik', 'sibirochka'],
      'thriller' : ['memorist', 'obvinyaemyij', 'sokryitoe1'],
      'detective' : ['ohota-monte-perdido', 'nyuhach'],
      'anime' : ['avatar-legenda-o-korre', 'bezdomnyij-bog', 'krutoy-uchitel-onidzuka'],
    }
  ],
  'animation' : [
    {
      'adventures' : ['99983', '99163', '87199', '70188', '45788'],
      'anime' : ['191355', '113712', '297852'],
    }
  ],
}


function drevo() {
    return drevos;
}


module.exports = drevo;
