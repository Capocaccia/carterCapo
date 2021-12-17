import Image from 'next/image'

type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <Image data-testid="avatar-image" width={40} height={40} src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div data-testid="avatar-author" className="text-xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
