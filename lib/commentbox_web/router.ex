defmodule CommentboxWeb.Router do
  use CommentboxWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CommentboxWeb do
    pipe_through :browser

    get "/", PageController, :index
    post "/login", LoginController, :login
    post "/validateToken", LoginController, :validateToken
    get "/comments", RoomController, :getComments
  end

  # Other scopes may use custom stacks.
  # scope "/api", CommentboxWeb do
  #   pipe_through :api
  # end
end
