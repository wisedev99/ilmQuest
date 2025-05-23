
import type { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Users, MessageSquare, CheckCircle, Edit3, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserType } from '@/lib/constants';
import Image from 'next/image';

interface UserProfileCardProps {
  user: User;
  isCurrentUserProfile?: boolean; // To show "Edit Profile" button
}

export function UserProfileCard({ user, isCurrentUserProfile = false }: UserProfileCardProps) {
  return (
    <Card className="w-full shadow-xl overflow-hidden">
      <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-r from-primary/80 to-accent/80">
        {/* Placeholder for a cover image */}
        <Image 
          src="https://placehold.co/800x200.png" 
          alt={`${user.name}'s cover image`} 
          layout="fill" 
          objectFit="cover" 
          data-ai-hint="islamic pattern landscape" 
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
            <AvatarFallback className="text-2xl sm:text-3xl md:text-4xl">
              {user.avatarUrl ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : <UserIcon size={32}/>}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <CardHeader className="text-center pt-12 sm:pt-16 md:pt-20">
        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">{user.name}</CardTitle>
        {user.userType === UserType.Ulama && (
          <Badge variant="default" className="mx-auto mt-1 bg-primary text-primary-foreground">
            <CheckCircle className="h-3 w-3 mr-1" /> Ulama
          </Badge>
        )}
        <CardDescription className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          {user.bio || (user.userType === UserType.Ulama ? "Respected scholar sharing knowledge." : "Member of the FajrulIlm community.")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 text-center my-4 sm:grid-cols-3 sm:gap-4 sm:my-6 border-t border-b py-4">
          <div>
            <p className="text-lg sm:text-xl font-semibold">{user.questionsAsked?.length || 0}</p>
            <p className="text-xs text-muted-foreground">Questions Asked</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl font-semibold">{user.answersProvided?.length || 0}</p>
            <p className="text-xs text-muted-foreground">Answers Provided</p>
          </div>
          <div className="sm:col-span-1"> {/* Ensures it doesn't break layout on smallest when single col */}
            <p className="text-lg sm:text-xl font-semibold">{user.followersCount}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-foreground/80">
          {user.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
          )}
          {/* Placeholder for location, if available in future */}
          {/* <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Location (e.g., City, Country)</span>
          </div> */}
        </div>
      </CardContent>
      
      <CardFooter className="px-4 md:px-6 py-4">
        {isCurrentUserProfile ? (
          <Button className="w-full">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        ) : (
          <Button className="w-full">
            <Users className="mr-2 h-4 w-4" /> Follow {user.name}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
