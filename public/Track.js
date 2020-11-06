class Track{
	id;
	name;
	artists;
	popularity;

	constructor(id, name,artists, popularity){
		this.id = id;
		this.name= name;
		this.artists="";
		for(let i=0;i<artists.length;i++)
		{
			this.artists += artists[i].name + " ";
		}
		this.popularity=popularity;
	}
}