import { Header, Icon, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';

const Nav = ({ history }) => {

  return (
    <>
      <div className={'nav-bar-image'} onClick={() => history.push('/')}>
        <Header as='h2' icon textAlign='center'>
          <Icon name='tree' circular color={'green'} />
          <Header.Content>TrekFinder</Header.Content>
        </Header>
      </div>

      <Menu secondary>
        <Menu.Item name='home' onClick={() => history.push('/')} />
        {
          !localStorage.getItem('token') && (
            <>
              <Menu.Item onClick={() => history.push('/login')} name='login' />
              <Menu.Item onClick={() => history.push('/signup')} name='signup' />
            </>
          )
        }
        {
          localStorage.getItem('token') && (
            <>
            <Menu.Item name='profile' onClick={() => history.push('/profile')} />
            <Menu.Item onClick={() => history.push('/logout')} name='logout' />
            </>
          )
        }
      </Menu>
    </>
  )
}

export default withRouter(Nav);