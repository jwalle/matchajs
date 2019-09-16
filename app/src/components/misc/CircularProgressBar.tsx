import * as React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';

const ProgressProvider = ({ valueStart, valueEnd, children }: any) => {
    const [value, setValue] = React.useState(valueStart);
    React.useEffect(() => { setValue(valueEnd); }, [valueEnd]);

    return children(value);
};

interface Props {
    percentage: number;
}

interface State {
    percentage: number;

}

export default class UserPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            percentage: 0,
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ percentage: this.props.percentage }), 1000);
    }

    render() {
        let { percentage } = this.state;

        return (
            <ProgressProvider className="infos-center" valueStart={0} valueEnd={percentage}>
                {(value: any) => <CircularProgressbarWithChildren
                    value={value}
                    className="circular-popu"
                    styles={{
                        path: {
                            // Path color
                            stroke: `rgba(217, 179, 16, 1)`,
                            strokeLinecap: 'round',
                            // Customize transition animation
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                            // Trail color
                            stroke: 'transparent',
                            strokeLinecap: 'butt',
                        },
                        // Customize the text
                        text: {
                            // Text color
                            fill: '#d9b310',
                            // Text size
                            fontSize: '16px',
                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                            fill: '#3e98c7',
                        },
                    }}
                >
                    {this.props.children}
                    <div className="info-popu">
                        <CountUp
                            start={0}
                            end={percentage}
                            delay={1}
                            separator=" "
                            suffix=" %"
                        />
                    </div>
                </CircularProgressbarWithChildren>}
            </ProgressProvider>

        );
    }
}