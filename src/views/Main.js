import React from 'react'
import { Navbar } from '../components/Navbar'
import { Switch, Route } from 'react-router-dom'
import { Home } from './Home'
import { Profile } from './Profile'
import { Contact } from './Contact'
import '../custom.css'
import { Cart } from './Cart'
import { BlogSingle } from './BlogSingle'
import { Shop } from './Shop'
import { StripeCheckout } from './StripeCheckout'


export const Main = (props) => {
  return (
    <div>
        <header>
          <Navbar signIn={props.signIn} />
        </header>
        
        <main className="container">
          <Switch>
              <Route exact path={'/'} render={() => <Home posts={props.posts}/>} />
              <Route exact path={'/blog/:id'} render={({ match }) => <BlogSingle match={match}/>} />
              <Route exact path={'/profile'} render={() => <Profile />} />
              <Route exact path={'/contact'} render={() => <Contact />} />
              
              <Route exact path={'/shop'} render={() => <Shop /> } />
              <Route exact path={'/checkout'} render={() => <Shop /> } />
              <Route exact path={'/cart'} render={() => <Cart /> } />
              {/* <Route exact path={'/create-checkout-session'} render = {() => <StripeCheckout /> } /> */}
          </Switch>
        </main>
        
        <footer>

        </footer>
      </div>
  )
}

