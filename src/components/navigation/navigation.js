import React from 'react';
import PeopleIcon from '@material-ui/icons/People';

const Navigation = (props) => {
    return (
        <div>
            <div className="flex flex-column near-white">
                <div className=" w-100 pa3 mr2">
                    <PeopleIcon />
                    <div className="pt2">Affiliates</div>
                </div>
            </div>
        </div>

    );
};

export default Navigation;