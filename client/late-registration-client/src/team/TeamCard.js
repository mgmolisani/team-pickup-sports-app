import React, {Component, Fragment} from 'react';
import DynamicCardField from '../shared/DynamicCardField';
import UserContext from '../contexts/UserContext';

export default class TeamCard
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            logo: '',
            mascot: '',
            hometown: '',
            editMode: false,
            showPlayerDetails: false,
            showPosts: false,
            post: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateTeam = this.updateTeam.bind(this);
        this.togglePlayerDetails = this.togglePlayerDetails.bind(this);
        this.togglePosts = this.togglePosts.bind(this);
        this.joinTeam = this.joinTeam.bind(this);
        this.leaveTeam = this.leaveTeam.bind(this);
        this.postContent = this.postContent.bind(this);
    }

    handleChange(input, value) {
        this.setState({[input]: value});
    }

    updateTeam() {
        if (this.state.editMode) {
            this.props.updateUser({
                ...this.props.team,
                username: this.state.username || this.props.username,
                firstName: this.state.firstName || this.props.firstName,
                lastName: this.state.lastName || this.props.lastName,
                userType: this.state.userType || this.props.userType,
                yearsExperience: this.state.yearsExperience || this.props.yearsExperience,
                hiredOn: this.state.hiredOn || this.props.hiredOn
            });
        }
        this.setState(state => ({editMode: !state.editMode}));
    }

    togglePlayerDetails() {
        this.setState(state => ({showPlayerDetails: !state.showPlayerDetails}));
    }

    togglePosts() {
        this.setState(state => ({showPosts: !state.showPosts}));
    }

    joinTeam(userId) {
        //TODO
        console.log(this.props.id + ' ' + userId);
    }

    leaveTeam(userId) {
        //TODO
        console.log(this.props.id + ' ' + userId);
    }

    postContent() {
        //TODO
        console.log(this.state.post);
        this.setState({post: ''});
    }

    render() {
        const {id, name, logo, mascot, hometown, coach, players, posts} = this.props;
        return (
            <UserContext.Consumer>
                {({currentUser}) => {
                    return (
                        <div className='col-md-6 col-lg-4 mb-4'>
                            <div className='card'>
                                <img className='card-img-top'
                                     src={logo || 'http://pakarya.com/website/views/layouts/static/images/placeholder-logo.png'}
                                     alt={name}
                                     style={{
                                         height: '15em',
                                         objectFit: 'contain'
                                     }}/>
                                <div className='card-body'>
                                    <DynamicCardField id={id}
                                                      label={'Team Name'}
                                                      value={this.state.name}
                                                      defaultValue={name}
                                                      onChange={event => this.handleChange('name', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Logo'}
                                                      value={this.state.logo}
                                                      defaultValue={logo}
                                                      onChange={event => this.handleChange('logo', event.target.value)}
                                                      isEditing={this.state.editMode}
                                                      hidden/>
                                    <DynamicCardField id={id}
                                                      label={'Mascot'}
                                                      value={this.state.mascot}
                                                      defaultValue={mascot}
                                                      onChange={event => this.handleChange('mascot', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Hometown'}
                                                      value={this.state.hometown}
                                                      defaultValue={hometown}
                                                      onChange={event => this.handleChange('hometown', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Coach'}
                                                      defaultValue={coach.firstName + ' ' + coach.lastName}/>
                                    <div className='form-group mb-0'>
                                        <label>
                                            Players
                                        </label>
                                        {this.state.showPlayerDetails
                                            ? <ul className='list-group'>
                                                {players.map(player => <li key={player._id}
                                                                           className='list-group-item'>
                                                    {player.firstName} {player.lastName}
                                                </li>)}
                                            </ul>
                                            : <h5>
                                                {players.length}
                                            </h5>}
                                        {players.length > 0
                                        && <button className='btn btn-secondary btn-block my-3'
                                                   onClick={this.togglePlayerDetails}>
                                            {this.state.showPlayerDetails ? 'Hide' : 'Show'} Player Details
                                        </button>}
                                    </div>
                                    <div className='form-group mb-0'>
                                        <label>
                                            Posts
                                        </label>
                                        {this.state.showPosts
                                            ? <ul className='list-group'>
                                                {posts.map(post => <li key={post._id}
                                                                       className='list-group-item'>
                                                    <label>
                                                        Posted by {post.postedBy.username}
                                                        <br/>
                                                        {post.created}
                                                    </label>
                                                    <p className='mb-0'>
                                                        {post.content}
                                                    </p>
                                                    {
                                                        (
                                                            currentUser.userType === 'ADMIN'
                                                            || currentUser._id === coach._id
                                                            || currentUser._id === post.postedBy._id
                                                        )
                                                        && <button className='btn btn-danger btn-sm mx-auto my-3'>
                                                            X
                                                        </button>
                                                    }
                                                </li>)}
                                            </ul>
                                            : <h5>
                                                {posts.length}
                                            </h5>}
                                        {posts.length > 0
                                        && <button className='btn btn-secondary btn-block my-3'
                                                   onClick={this.togglePosts}>
                                            {this.state.showPosts ? 'Hide' : 'Show'} Posts
                                        </button>}
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='form-group'>
                                        <label htmlFor={'post'}>
                                            New Post
                                        </label>
                                        <textarea className='form-control'
                                                  id={'post'}
                                                  value={this.state.post}
                                                  onChange={event => this.handleChange('post', event.target.value)}/>
                                    </div>
                                    <button className='btn btn-dark btn-block'
                                            onClick={this.postContent}>
                                        Post
                                    </button>
                                    {
                                        currentUser.userType === 'PLAYER'
                                            ? players.some(player => player._id === currentUser._id)
                                            ? <button className='btn btn-danger btn-block'
                                                      onClick={() => this.leaveTeam(currentUser._id)}>
                                                Leave Team
                                            </button>
                                            : <button className='btn btn-success btn-block'
                                                      onClick={() => this.joinTeam(currentUser._id)}>
                                                Join Team
                                            </button>
                                            : null

                                    }
                                    {
                                        (
                                            currentUser.userType === 'ADMIN'
                                            || currentUser._id === coach._id
                                        )
                                        && <Fragment>
                                            <button className='btn btn-secondary btn-block'
                                                    onClick={this.updateTeam}>
                                                {this.state.editMode ? 'Update' : 'Enter Edit Mode'}
                                            </button>
                                            <button className='btn btn-danger btn-block'
                                                    onClick={this.props.deleteTeam}>
                                                Delete
                                            </button>
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                    );
                }}
            </UserContext.Consumer>
        );
    };
};