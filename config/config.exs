# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :commentbox,
  ecto_repos: [Commentbox.Repo]

# Configures the endpoint
config :commentbox, CommentboxWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "v0fqH55jeUt8q1QH6TPiH3C/geg/SkiGWGuNP2stxFYJw69pQpzTr2Q1/Ma9Whtn",
  render_errors: [view: CommentboxWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Commentbox.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
