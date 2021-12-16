type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <img data-testid="avatar-image" src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div data-testid="avatar-author" className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
