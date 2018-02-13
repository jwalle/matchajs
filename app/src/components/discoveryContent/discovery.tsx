import * as React from 'react';
require('./discovery.css');

export default class Discovery extends React.Component {

    render() {
        return (
            <div className="discovery">
                <div id="discovery-interest">
                    <div id="interest-layout">
                        <div id="interest">They love: Metal</div>
                        <div id="interested">
                            <div id="interested-profile">
                                <img src="http://via.placeholder.com/140" alt="pseudo here" />
                                <p className="interested-name">Lilia</p>
                                <p className="interested-match">90 %</p>
                            </div>
                            <div id="interested-profile">
                                <img src="http://via.placeholder.com/140" alt="pseudo here" />
                                <p className="interested-name">Lilia</p>
                                <p className="interested-match">90 %</p>
                            </div>
                            <div id="interested-profile">
                                <img src="http://via.placeholder.com/140" alt="pseudo here" />
                                <p className="interested-name">Lilia</p>
                                <p className="interested-match">90 %</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="discovery-snapshot">
                    <div id="snapshot-layout">
                        <div id="snap-txt">They have new picture :</div>
                        <div id="snapshot-profiles">
                            <div className="snapshot-profile">
                                <div className="snap-new-pic" />
                                <img
                                    className="snap-profile-pic"
                                    src="http://via.placeholder.com/100/white"
                                    alt="pseudo here"
                                />
                                <div className="snap-bottom">
                                    <p className="snap-name">Lilia</p>
                                    <p className="snap-quote">"My last vacation !"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}