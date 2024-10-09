const regions = ['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Others'];

export const siteData = {
  nodes: [
    { id: 'home', group: 'home', size: 20, label: 'Home', region: 'North America' },
    { id: 'blog', group: 'blog', size: 15, label: 'Blog', region: 'Europe' },
    { id: 'media', group: 'media', size: 15, label: 'Media', region: 'Asia' },
    { id: 'tools', group: 'tools', size: 15, label: 'Tools', region: 'Africa' },
    { id: 'about', group: 'about', size: 10, label: 'About', region: 'South America' },
    { id: 'journal', group: 'journal', size: 10, label: 'Journal', region: 'Others' },
    { id: 'post1', group: 'blog', size: 10, label: 'Blog Post 1', region: 'Europe' },
    { id: 'post2', group: 'blog', size: 8, label: 'Blog Post 2', region: 'Europe' },
    { id: 'post3', group: 'blog', size: 9, label: 'Blog Post 3', region: 'Europe' },
    { id: 'video1', group: 'media', size: 12, label: 'Video 1', region: 'Asia' },
    { id: 'video2', group: 'media', size: 10, label: 'Video 2', region: 'Asia' },
    { id: 'tool1', group: 'tools', size: 11, label: 'Tool 1', region: 'Africa' },
    { id: 'tool2', group: 'tools', size: 13, label: 'Tool 2', region: 'Africa' },
    ...Array(150).fill().map((_, i) => ({
      id: `v${i}`,
      group: 'visitor',
      size: 5,
      label: '',
      region: regions[Math.floor(Math.random() * regions.length)],
      index: i
    }))
  ],
  links: [
    { source: 'home', target: 'blog' },
    { source: 'home', target: 'media' },
    { source: 'home', target: 'tools' },
    { source: 'home', target: 'about' },
    { source: 'home', target: 'journal' },
    { source: 'blog', target: 'post1' },
    { source: 'blog', target: 'post2' },
    { source: 'blog', target: 'post3' },
    { source: 'media', target: 'video1' },
    { source: 'media', target: 'video2' },
    { source: 'tools', target: 'tool1' },
    { source: 'tools', target: 'tool2' },
    ...Array(300).fill().map(() => {
      const visitorId = `v${Math.floor(Math.random() * 150)}`;
      const pageId = ['home', 'blog', 'media', 'tools', 'about', 'journal', 'post1', 'post2', 'post3', 'video1', 'video2', 'tool1', 'tool2'][Math.floor(Math.random() * 13)];
      return {
        source: visitorId,
        target: pageId
      };
    })
  ]
};


https://preetmishra.com/craft/album
  