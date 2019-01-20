import React from 'react';

const Navigation = (props) => {
    return (
        <header className="bg-dark-gray fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            <nav className="f6 fw6 tl ttu tracked">
                <a className="link dim white dib tl mr3" href="#" title="Home">Affiliates</a>
                <div className="fr">
                    {
                        (props.isLoggedIn) ?
                         (
                            <button onClick={props.methods.changeLoggedIn} className="br3 b--transparent dim link ph3 white bg-red">
                            Logout
                            </button>

                        ) : ""
                    }


                </div>
            </nav>
        </header>

    );
};

export default Navigation;