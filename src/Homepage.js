import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from "firebase/compat/app";
import 'firebase/compat/database';
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';
class Homepage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {links: '', allLinks: ''};
        let ref = firebase.database().ref('/homepage');
        ref.on("value", snapshot => {
            const homepageData = snapshot.val();
            this.setState({links: homepageData});
        });
      }
    render() {
        const homepageData = this.state.links;
        const deckNames = Object.values(homepageData);
        const linkNames = Object.keys(homepageData);
        const linkConcat = (link) => {
            const linkStart = "/viewer/";
            return linkStart.concat(link);
        };
        const allLinks = linkNames.map(linkConcat);
        let deckItems = [];
        for (const [key, name] of Object.entries(deckNames)) {
            for (const [key, value] of Object.entries(name)) {
                deckItems.push(value);
            }
        }
        let linkItems = [];
        for (let i = 0; i < allLinks.length; i++) {
            linkItems.push(<Link to = {allLinks[i]}>{deckItems[i]}</Link>);
            linkItems.push(<br />);
        }
        return(
            <div>
            <h2>Homepage</h2>
            <><Link to="/viewer">Go to card viewer</Link>
            <br></br>
            <Link to="/editor">Go to card editor</Link></>
            <hr />
            {linkItems}
            </div>
            
        );
    }
}

export default compose(
    firebaseConnect(),
    withRouter
  )(Homepage);