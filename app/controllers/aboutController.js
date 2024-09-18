//* Functionnality : get infos cgv, rgpd, mentions légales, faq
import 'dotenv/config';

export default { 
  async getAboutPage (req, res) { 
        res.render('about',
            {title: "GreenRoots - A Propos", 
            cssFile :"about.css"
            }
        )},       
}