import React from 'react';
import {ThemeContext, UserContext} from '../context';

export default function ComsumerPage() {
    return (
        <div>
            <ThemeContext.Consumer>
                {themeCor => (
                    <UserContext.Consumer>
                        {user => (
                            <div>
                                <div>{themeCor.themeColor}</div>
                                <div>{user.name}</div>
                            </div>
                        )}
                    </UserContext.Consumer>
                )}
            </ThemeContext.Consumer> 
        </div>
    )
}

