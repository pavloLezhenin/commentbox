defmodule Commentbox.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the Ecto repository
      Commentbox.Repo,
      # Start the endpoint when the application starts
      CommentboxWeb.Endpoint,
      # Starts a worker by calling: Commentbox.Worker.start_link(arg)
      # {Commentbox.Worker, arg},
      {ConCache, [
        name: :comments_cache,
        ttl_check_interval: :timer.hours(24),
        global_ttl: :timer.hours(24)
      ]}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Commentbox.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    CommentboxWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
