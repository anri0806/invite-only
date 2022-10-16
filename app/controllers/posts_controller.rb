class PostsController < ApplicationController
 # skip_before_action :authorize, only: [:index, :show, :create]

    def index
        posts = Post.all
        render json: posts
    end

    def group_posts
        posts = Post.where(group_id: params[:id])
        render json: posts, status: :ok
    end

    def user_posts
        posts = Post.where(user_id: params[:id])
        render json: posts, status: :ok
    end

    def show
        post = Post.find_by(id: params[:id])
        render json: post, status: :ok
    end

    def create
        post = Post.create(post_params)
        if post.valid?
            render json: post, status: :created
        else
            render json: {errors: post.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        post = Post.find_by(id: params[:id])
        if post
            post.destroy
            head :no_content
        else
            render json: {error: "Post not fonud"}, status: :not_found
        end
        
    end

    private

    def post_params
        params.permit(:caption, :user_id, :picture, :group_id)
    end
end
