import { FormData } from '../types';

export const mapFormDataToLead = (formData: Partial<FormData>): Record<string, any> => {
  return {
    basicInfo: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: `${formData.phoneDDI || ''} ${formData.phone || ''}`.trim(),
      gender: formData.gender || '',
      ageRange: formData.ageRange || '',
      parentalConsent: formData.parentalAuth === 'Sim'
    },
    challenges: {
      mainDifficulties: formData.biggestDifficulty || [],
      biggestFrustration: formData.biggestFrustration || '',
      triedLearningBefore: formData.triedLearning || '',
      failureReason: formData.whyFailed?.join(', ') || '',
      learningSource: formData.whereTried || []
    },
    demographics: {
      occupation: formData.occupation || '',
      incomeRange: formData.income || '',
      country: formData.country === 'Outro' ? formData.otherCountry || '' : formData.country || '',
      cep: formData.cep || '',
      city: formData.city || '',
      state: formData.state || '',
      businessNiche: formData.businessNiche || '',
      businessTime: formData.businessDuration || '',
      businessVideoUsage: formData.useVideoInBusiness || '',
      jobRelationToComms: formData.relatedToContent || '',
      studyField: formData.studyArea || '',
      incomeUrgency: formData.seekingNewIncome || '',
      dailyAvailability: formData.dailyAvailability || ''
    },
    goals: {
      mainObjective: formData.mainGoal || '',
      interestedNiches: formData.interestedNiches || [],
      sixMonthGoal: formData.sixMonthGoal || '',
      weeklyStudyTime: formData.timePerWeek || '',
      inspirations: formData.inspirations || '',
      currentContentSpend: formData.currentMarketingSpend || '',
      creationBenefits: formData.videoCreationBenefit || '',
      currentAudienceSize: formData.audienceSize || '',
      priorityPlatform: formData.priorityPlatform || '',
      socialMediaGoal: formData.socialMediaGoal || '',
      incomeTarget: formData.extraIncomeGoal || '',
      monetizationPlan: formData.monetizationMethods || [],
      transitionTimeline: formData.careerChangeTimeframe || '',
      financialReserve: formData.transitionReserve || '',
      transitionWorry: formData.careerChangeWorry || ''
    },
    experience: {
      level: formData.experienceLevel || '',
      interestDuration: formData.interestDuration || '',
      phoneModel: formData.phoneModel || '',
      videoCreationHistory: formData.createdVideosBefore || '',
      biggestTechDifficulty: formData.biggestTechnicalDifficulty || '',
      extraEquipment: formData.additionalEquipment || [],
      impediments: formData.whatStopsYouNow || [],
      cameraShy: formData.fearOfAppearing || '',
      techIntimidationScore: formData.techIntimidation || 0,
      videosCreatedTypes: formData.pastVideoTypes || [],
      editingSoftware: formData.editingSoftware || '',
      improvementDesired: formData.whatToImproveInVideos || '',
      isMonetized: formData.monetizedBefore || '',
      monthlyProductionAvg: formData.videosPerMonth || '',
      growthBottleneck: formData.evolutionBottleneck || '',
      careerFocus: formData.specializeOrGeneralize || '',
      planToChangePhone: formData.willChangePhone || ''
    },
    investment: {
      previousInvestments: formData.hasInvestedBefore || '',
      willingnessToPay: formData.investmentWillingness || '',
      paymentPreference: formData.paymentPreference || '',
      mainObjection: formData.mainObjection || '',
      preferredLearningFormat: formData.learningFormat || [],
      idealCourseDuration: formData.courseDuration || '',
      securityFactors: formData.investmentSecurity || [],
      totalInvestedAmount: formData.totalInvested || '',
      satisfactionLevel: formData.investmentSatisfaction || '',
      missingInPreviousCourses: formData.whatLackedInCourses || '',
      highTicketValues: formData.premiumValue || '',
      mentoringInterest: formData.mentorshipInterest || '',
      financialLimitationReal: formData.freeLimitationReason || '',
      installmentFeasibility: formData.canPayInInstallments || '',
      investmentMindset: formData.investmentOrExpense || '',
      selfConfidenceScore: formData.selfBeliefScale || 0,
      pastLearningSuccess: formData.learnedDifficultThing || '',
      supportEffect: formData.wouldTryWithSupport || '',
      pastFailureAnalysis: formData.whatWentWrong || '',
      pastSupportQuality: formData.hadAdequateSupport || '',
      methodRetryWillingness: formData.tryDifferentMethod || '',
      shortMethodViability: formData.canDo15minMethod || ''
    },
    motivation: {
      motivationScore: formData.motivationScale || 0,
      primaryDriver: formData.mainMotivationReason || '',
      successDefinition: formData.successMeaning || '',
      resultsTimelineExpectation: formData.resultsTimeframe || '',
      startImmediately: formData.wouldStartToday || '',
      biggestFear: formData.biggestFear || '',
      wantFreeMaterials: formData.wantsFreeMaterials || '',
      allowContact: formData.allowContact || '',
      extraComments: formData.finalComments || '',
      highMotivationSource: '', // Placeholder, map if available
      actionBlocker: formData.mainObjection || '', // Placeholder
      immediateStartLikelihood: formData.wouldTryWithSupport || '', // Re-using for context
      lifeImpactIn3Months: formData.successMeaning || '', // Re-using for context
      motivationBoosterNeeded: '', // Placeholder
      waitingFor: formData.mainObjection || '', // Re-using for context
      lowMotivationReason: '', // Placeholder
      curiosityLevel: formData.wouldTryWithSupport || '', // Re-using for context
      motivationTriggerNeeded: '', // Placeholder
      idealIncomeAmount: formData.idealIncome || '',
      incomeTimeline: formData.incomeTimeframe || '',
      currentJobDissatisfaction: formData.hateJobScale || 0,
      quitJobDeadline: formData.exitTimeframe || '',
      intensityAvailability: formData.intensiveAvailability || '',
      preferredFreeMaterialType: formData.preferredFreebie || '',
      contactMethod: formData.contactMethod || '',
      bestContactTime: formData.contactTime || '',
      meetingPreference: formData.proposalPreference || '',
      shortTermInvestProb: formData.investmentLikelihood || 0,
      conversionKey: formData.whatWouldMakeItYes || ''
    }
  };
};